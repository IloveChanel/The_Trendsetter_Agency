import { NextRequest, NextResponse } from 'next/server';
import { verifyDownloadUrl } from '@/lib/sign-url';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  if (!token) {
    return new NextResponse('Missing token', { status: 400 });
  }

  const data = verifyDownloadUrl(token);
  if (!data) {
    return new NextResponse('Invalid or expired link', { status: 403 });
  }

  const filePath = join(process.cwd(), 'public', 'alllink-dashboard.html');
  const file = readFileSync(filePath, 'utf8');

  return new NextResponse(file, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'content-disposition': 'attachment; filename="alllink-dashboard.html"',
    },
  });
}
