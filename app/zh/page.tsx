import HomeExperience from '@/components/home-experience';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Reels 与短视频创作 · 佛山', description: 'STORY GRID 专注 Reels 与短视频，从创意策划、拍摄到剪辑交付，为品牌持续创作社交内容。', alternates: { canonical: '/zh-CN', languages: { en: '/en', 'zh-CN': '/zh-CN' } }, openGraph: { locale: 'zh_CN' } };
export default function ChineseHome() { return <HomeExperience language="zh" />; }
