import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';
import { PageIntro } from '@/components/sections';
export const metadata:Metadata={title:'联系',description:'联系位于中国佛山的 STORY GRID，聊聊你的下一个项目。',alternates:{canonical:'/zh-CN/contact',languages:{en:'/en/contact','zh-CN':'/zh-CN/contact'}}};
export default function ChineseContactPage(){return <main className="inner-page contact-page"><PageIntro index="04 / 开始沟通" title={<>下一个好创意，<br/><em>从这里开始。</em></>} copy="有项目想法吗？告诉我们你希望实现什么，我们会联系你，一起讨论下一步。"/><div className="contact-layout"><div className="contact-details"><Image className="contact-brand" src="/brand/story-grid-logo-dark.png" width={1000} height={834} alt="STORY GRID — Ideas in Motion"/><p className="eyebrow">中国 / 广东 / 佛山</p><a href="mailto:storygridmedia1@gmail.com">storygridmedia1@gmail.com ↗</a><a href="tel:+8613288444304">+86 132 8844 4304 ↗</a><a href="https://www.instagram.com/story_gridmedia/" target="_blank" rel="noreferrer">Instagram / @story_gridmedia ↗</a><p className="contact-address">中国广东省佛山市<br/>邮编 528000</p><Link className="under-link" href="/zh-CN">返回首页 <span>↗</span></Link></div><ContactForm language="zh"/></div></main>;}
