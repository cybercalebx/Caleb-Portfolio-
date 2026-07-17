import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.TO_EMAIL || 'andrewcaleb608@gmail.com';

    if (!host || !user || !pass) {
      return NextResponse.json({ error: 'SMTP not configured on server.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const mail = {
      from: `${data.name || 'Website Contact'} <${data.email || user}>`,
      to,
      subject: `[Website] ${data.subject || 'New contact message'}`,
      text: `Name: ${data.name || ''}\nEmail: ${data.email || ''}\n\n${data.message || ''}`,
      html: `<p><b>Name:</b> ${data.name || ''}</p><p><b>Email:</b> ${data.email || ''}</p><p>${(data.message || '').replace(/\n/g, '<br>')}</p>`,
    };

    const info = await transporter.sendMail(mail);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
