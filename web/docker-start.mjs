import { spawn } from 'node:child_process';
import { existsSync, rmSync, writeFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';

const readyFile = '/tmp/leonafoto-homepage-ready';
const baseUrl = `http://127.0.0.1:${process.env.PORT || '3000'}`;

if (process.argv.includes('--healthcheck')) {
  try {
    if (!existsSync(readyFile)) throw new Error('Homepage is not ready');
    const response = await fetch(baseUrl, { signal: AbortSignal.timeout(3000) });
    await response.arrayBuffer();
    process.exit(response.ok ? 0 : 1);
  } catch {
    process.exit(1);
  }
}

rmSync(readyFile, { force: true });
if (!process.env.REVALIDATE_SECRET || process.env.SKIP_GALLERY_PRERENDER === '1') {
  console.error('Startup requires REVALIDATE_SECRET and must not skip gallery rendering.');
  process.exit(1);
}

const server = spawn(process.execPath, ['server.js'], {
  stdio: 'inherit',
  env: { ...process.env, HOMEPAGE_WARMUP: '1' },
});
let stopping = false;
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    stopping = true;
    rmSync(readyFile, { force: true });
    server.kill(signal);
  });
}
server.on('exit', (code, signal) => {
  rmSync(readyFile, { force: true });
  process.exit(stopping ? 0 : (process.exitCode || code || (signal ? 1 : 0)));
});
server.on('error', (error) => {
  console.error('Server startup failed:', error);
  process.exit(1);
});

const headers = { 'x-revalidate-secret': process.env.REVALIDATE_SECRET };
let lastError;
const deadline = Date.now() + 60000;
while (Date.now() < deadline && !stopping) {
  try {
    const invalidation = await fetch(`${baseUrl}/api/revalidate`, {
      method: 'POST', headers, signal: AbortSignal.timeout(5000),
    });
    await invalidation.arrayBuffer();
    if (!invalidation.ok) throw new Error(`Revalidation returned HTTP ${invalidation.status}`);

    const homepage = await fetch(baseUrl, { headers, signal: AbortSignal.timeout(10000) });
    const html = await homepage.text();
    if (!homepage.ok || html.includes('data-gallery-placeholder="true"')) {
      throw new Error('Homepage regeneration did not produce a live gallery');
    }

    writeFileSync(readyFile, 'ready\n');
    console.log('Homepage cache warmed from the mounted database; ready for traffic.');
    break;
  } catch (error) {
    lastError = error;
    await delay(500);
  }
}

if (!existsSync(readyFile) && !stopping) {
  console.error('Homepage warmup failed:', lastError);
  process.exitCode = 1;
  server.kill('SIGTERM');
}
