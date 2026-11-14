# LeonaFoto

Next.js site using Node.js 26 Alpine, SQLite, and uploaded images on disk.

## Development

From `web`, configure `.env.local`, then run `npm ci` and `npm run dev`.

## Docker

From the repository root:

```sh
cp .env.example .env
# Edit .env with your paths and credentials.
docker compose up -d --build
docker compose logs -f web
```

- `DATA_DIR` and `IMAGES_DIR` select existing host directories mounted at
  `/app/data` and `/app/images`. They must be writable by UID/GID `1000:1000`.
- Set `DATABASE_URL` and `AUTH_USERS` to container paths, such as
  `file:/app/data/gallery.db` and `/app/data/users.json`. Database initialization
  and migrations are manual.
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is a build argument; rebuild when it changes.
  Server credentials and settings are runtime variables listed in Compose.
- `REVALIDATE_SECRET` is required for startup warmup and gallery invalidation.
  `BASE_URL` and `NEXT_PUBLIC_IMAGES_DOMAIN` are unused.

Builds render a placeholder without querying SQLite. Startup regenerates the
cached homepage from mounted data; homepage requests receive 503 until ready.
Uploads and deletions invalidate the page for regeneration on the next request.

HTTP is exposed on port 3000 (`HTTP_PORT` overrides it). HTTPS is managed
externally and is required for production browser login.
