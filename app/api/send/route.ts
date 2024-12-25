import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_5VvcxYy7_wJ4mftKSAt5i5ZFDMz46VGMG');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'ramadeva1101@gmail.com',
      subject: `Pesan Baru dari ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">Ada Pesan Baru dari Website!</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Nama:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Pesan:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Gagal mengirim email' },
      { status: 500 }
    );
  }
}