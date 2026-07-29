import { NextRequest } from 'next/server';

export async function verifyAuth(request: NextRequest): Promise<boolean> {
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin';

  const authCookie = request.cookies.get('admin_token');
  if (authCookie && authCookie.value === expectedPassword) {
    return true;
  }
  
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.replace('Bearer ', '') === expectedPassword) {
    return true;
  }
  
  return false;
}
