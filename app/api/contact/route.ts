import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) return NextResponse.json({ error: 'Please send a valid form.' }, { status: 415 });
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 16_000) return NextResponse.json({ error: 'Your message is too large. Please shorten it and try again.' }, { status: 413 });
  let data: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > 16_000) return NextResponse.json({ error: 'Your message is too large. Please shorten it and try again.' }, { status: 413 });
    const payload: unknown = JSON.parse(rawBody);
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return NextResponse.json({ error: 'Please send a valid form.' }, { status: 400 });
    data = payload as Record<string, unknown>;
  } catch { return NextResponse.json({ error: 'Please send a valid form.' }, { status: 400 }); }
  if (typeof data.website === 'string' && data.website.trim()) return NextResponse.json({ error: 'Please check your details and try again.' }, { status: 400 });
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (name.length < 2 || name.length > 120 || /[\r\n\u0000-\u001f]/.test(name) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || message.length < 10 || message.length > 5000) return NextResponse.json({ error: 'Check your name, email, and project description, then try again.' }, { status: 400 });
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'storygridmedia1@gmail.com';
  if (!apiKey) return NextResponse.json({ error: 'The contact form is not connected yet. Please email storygridmedia1@gmail.com directly.' }, { status: 503 });
  const fields = ['business','phone','service','budget'].map((key) => `${key}: ${typeof data[key] === 'string' ? String(data[key]).slice(0,300) : '—'}`).join('\n');
  let response: Response;
  try {
    response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(10_000), body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL || 'STORY GRID Website <onboarding@resend.dev>', to: [to], reply_to: email, subject: 'New STORY GRID project inquiry', text: `Name: ${name}\nEmail: ${email}\n${fields}\n\nProject:\n${message}` }) });
  } catch {
    return NextResponse.json({ error: 'We could not send your message just now. Please email storygridmedia1@gmail.com.' }, { status: 502 });
  }
  if (!response.ok) return NextResponse.json({ error: 'We could not send your message just now. Please email storygridmedia1@gmail.com.' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
