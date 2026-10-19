import type { Metadata } from 'next';
import type { ReactNode } from 'react';
export const metadata: Metadata = { openGraph: { locale: 'zh_CN', siteName: 'STORY GRID', type: 'website' } };
export default function ChineseLayout({children}:{children:ReactNode}) { return children; }
