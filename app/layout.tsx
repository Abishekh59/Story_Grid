import type { Metadata } from 'next';
import { headers } from 'next/headers';
import type { ReactNode } from 'react';
import './globals.css';
import { SiteFooter, SiteHeader } from '@/components/chrome';

const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||(process.env.VERCEL_URL?`https://${process.env.VERCEL_URL}`:undefined);
export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: 'STORY GRID | Reels & Short-Form Video in Foshan', template: '%s — STORY GRID' },
  description: 'A Reels and short-form video studio in Foshan, China. Creative planning, filming, and editing for brands, with digital support when needed.',
  icons: { icon: [{ url: '/brand/story-grid-emblem-dark.png', media: '(prefers-color-scheme: light)' }, { url: '/brand/story-grid-emblem-light.png', media: '(prefers-color-scheme: dark)' }], shortcut: '/brand/story-grid-emblem-dark.png', apple: '/brand/story-grid-emblem-dark.png' },
  openGraph: { title: 'STORY GRID — Reels & Short-Form Video', description: 'Reels-first creative planning, filming, and editing in Foshan, China.', type: 'website', locale: 'en_US', ...(siteUrl ? { images: [{ url: '/brand/story-grid-logo-dark.png', width: 1000, height: 834, alt: 'STORY GRID — Ideas in Motion' }] } : {}) },
  twitter: { card: 'summary_large_image', ...(siteUrl ? { images: ['/brand/story-grid-logo-dark.png'] } : {}) },
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const locale = (await headers()).get('x-story-grid-locale') === 'zh-CN' ? 'zh-CN' : 'en';
  return <html lang={locale}><body><a className="skip-link" href="#main-content">{locale==='zh-CN'?'跳至正文':'Skip to content'}</a><SiteHeader /><div id="main-content" tabIndex={-1}>{children}</div><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'STORY GRID', description: 'Creative media and digital growth agency specializing in video production, website development, Meta advertising, and social media.', email: 'storygridmedia1@gmail.com', telephone: '+86 132 8844 4304', address: { '@type': 'PostalAddress', addressLocality: 'Foshan', addressRegion: 'Guangdong', postalCode: '528000', addressCountry: 'CN' }, sameAs: ['https://www.instagram.com/story_gridmedia/'] }).replace(/</g, '\\u003c') }} /></body></html>;
}
