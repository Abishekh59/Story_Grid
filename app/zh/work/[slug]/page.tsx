import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/content';
import { PageIntro } from '@/components/sections';
export function generateStaticParams(){return projects.map(({slug})=>({slug}));}
export const dynamicParams=false;
const localized:Record<string,{title:string;challenge:string;approach:string;services:string[]}>= {
  'frame-form':{title:'画面 / 形态',challenge:'探索如何用运动感与材质建立令人难忘的视觉语言，同时不借用真实客户身份。',approach:'以克制的电影构图、温暖材质和反复出现的网格，让概念保持连贯与编辑感。',services:['创意方向','品牌影片概念','动态视觉语言']},
  'field-notes':{title:'旷野手记',challenge:'展示数字体验如何讲述细腻的产品故事，同时让内容路径保持清晰。',approach:'以编辑式层级、触感中性色与响应式页面构成视觉方向。',services:['数字艺术指导','网站设计概念','响应式布局']},
  'one-good-thing':{title:'一件好事',challenge:'设计一个可持续延展的社交内容概念，让日常时刻也具有独特的视觉表达。',approach:'以精简配色、清晰的内容格式与短篇编辑提示，建立系列感与辨识度。',services:['社交内容概念','活动创意','艺术指导']},
};
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=localized[slug];return item?{title:item.title,description:item.challenge,alternates:{canonical:`/zh-CN/work/${slug}`,languages:{en:`/en/work/${slug}`,'zh-CN':`/zh-CN/work/${slug}`}},openGraph:{locale:'zh_CN'}}:{};}
export default async function ChineseWorkDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=projects.find(item=>item.slug===slug);const item=localized[slug];if(!project||!item)notFound();return <main className="inner-page"><PageIntro index={`作品 / ${project.tag}`} title={<>{item.title}<br/><em>概念研究。</em></>} copy={item.challenge}/><section className="case-study-meta"><div><span className="eyebrow">品牌 / 客户</span><p>独立概念研究</p></div><div><span className="eyebrow">类型</span><p>非委托概念作品</p></div><div><span className="eyebrow">说明</span><p>非真实客户项目</p></div></section><div className={`case-study-art ${project.tone}`} role="img" aria-label={`${item.title}的抽象创意视觉`}><div className="project-lines"/><span>{item.title}</span><small>{project.tag} / STORY GRID</small></div><section className="case-study-content"><article><p className="eyebrow">挑战</p><h2>找到清晰的表达。</h2><p>{item.challenge}</p></article><article><p className="eyebrow">创意方向</p><h2>让每个选择彼此呼应。</h2><p>{item.approach}</p></article><article><p className="eyebrow">服务内容</p><ul>{item.services.map(service=><li key={service}>{service}</li>)}</ul></article><article><p className="eyebrow">成果</p><p>这是独立概念研究，不涉及客户或广告活动数据。</p></article></section><div className="case-study-actions"><Link className="under-link" href="/zh-CN/work">← 返回作品</Link><Link className="button button-red" href="/zh-CN/contact">聊聊类似项目 <span>↗</span></Link></div></main>;}
