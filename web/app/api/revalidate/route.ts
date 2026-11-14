import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

function revalidate(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const suppliedSecret =
    request.headers.get('x-revalidate-secret') ??
    request.nextUrl.searchParams.get('secret');

  if (!secret || suppliedSecret !== secret) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  revalidatePath('/');
  return NextResponse.json({ revalidated: true });
}

// Preserve the original GET endpoint; internal callers use POST and a header.
export const GET = revalidate;
export const POST = revalidate;
