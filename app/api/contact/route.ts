import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const sheetUrl = process.env.GOOGLE_SHEET_WEBAPP_URL || process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBAPP_URL;

    if (!sheetUrl) {
      console.warn('GOOGLE_SHEET_WEBAPP_URL is not set in environment variables.');
      return NextResponse.json(
        { error: 'Google Sheet WebApp URL not configured. Please set GOOGLE_SHEET_WEBAPP_URL in .env' },
        { status: 500 }
      );
    }

    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name,
        email,
        message,
      }),
    });

    const resText = await response.text();
    console.log('Google Apps Script response:', response.status, resText);

    try {
      const data = JSON.parse(resText);
      if (data.result === 'error') {
        throw new Error('Apps Script Error: ' + data.error);
      }
    } catch (e: any) {
      // If it fails to parse or it was an error
      if (e.message.includes('Apps Script Error')) throw e;
      // otherwise ignore parsing error
    }

    return NextResponse.json({ success: true, debug: resText });
  } catch (error: any) {
    console.error('Error submitting form to Google Sheet:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
