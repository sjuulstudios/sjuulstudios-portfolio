import { NextResponse } from 'next/server';
export async function POST(){
  // Disabled by default. See README to enable with Resend/SMTP.
  return NextResponse.json({ ok: false, message: 'Contact form disabled. Set up email provider first.' }, { status: 501 });
}
