import HomeExperience from '@/components/home-experience';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Reels & Short-Form Video in Foshan', description: 'STORY GRID focuses on Reels and short-form video—from creative concept and filming to editing and platform-ready delivery.', alternates: { canonical: '/en', languages: { en: '/en', 'zh-CN': '/zh-CN' } } };
export default function Home() { return <HomeExperience />; }
