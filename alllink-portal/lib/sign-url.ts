import { createHmac } from 'crypto';

const SECRET = process.env.STRIPE_SECRET_KEY!;

export function signDownloadUrl(payload: { email: string; exp: number }) {
  const data = JSON.stringify(payload);
  const sig = createHmac('sha256', SECRET).update(data).digest('hex');
  const base64 = Buffer.from(data).toString('base64url');
  return \.\;
}

export function verifyDownloadUrl(token: string) {
  try {
    const [base64, sig] = token.split('.');
    if (!base64 || !sig) return null;
    const data = JSON.parse(Buffer.from(base64, 'base64url').toString('utf8'));
    const expectedSig = createHmac('sha256', SECRET).update(JSON.stringify(data)).digest('hex');
    if (expectedSig !== sig) return null;
    if (Date.now() > data.exp) return null;
    return data as { email: string; exp: number };
  } catch {
    return null;
  }
}
