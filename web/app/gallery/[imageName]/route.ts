import { readFile } from 'fs/promises';
import path from 'path';

const contentTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

const getContentType = (fileName: string) => {
  const extension = path.extname(fileName).toLowerCase();
  return contentTypes[extension] ?? 'application/octet-stream';
};

const getImagePath = (imageName: string) => {
  if (!process.env.IMAGES_DIR) {
    throw new Error('IMAGES_DIR not set');
  }

  const safeImageName = path.basename(imageName);
  return path.join(process.env.IMAGES_DIR, safeImageName);
};

type RouteContext = {
  params: Promise<{
    imageName: string;
  }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { imageName } = await context.params;
    const imagePath = getImagePath(imageName);
    const image = await readFile(imagePath);

    return new Response(new Uint8Array(image), {
      headers: {
        'content-type': getContentType(imageName),
        'cache-control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      return new Response('Image not found', { status: 404 });
    }

    console.error(error);
    return new Response('Internal server error', { status: 500 });
  }
}
