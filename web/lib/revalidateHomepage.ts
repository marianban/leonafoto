export async function revalidateHomepage() {
  try {
    if (!process.env.REVALIDATE_SECRET) {
      throw new Error('REVALIDATE_SECRET is not set');
    }

    const response = await fetch(
      `http://127.0.0.1:${process.env.PORT || '3000'}/api/revalidate`,
      {
        method: 'POST',
        headers: { 'x-revalidate-secret': process.env.REVALIDATE_SECRET },
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) {
      throw new Error(`Revalidation returned HTTP ${response.status}`);
    }
  } catch (error) {
    // The mutation is already committed; do not report it as a failed upload/delete.
    console.error('Homepage revalidation failed after gallery update:', error);
  }
}
