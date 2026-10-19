import type { Metadata } from 'next';
import { projects } from '@/lib/content';
import { PageIntro, ProjectCard } from '@/components/sections';
export const metadata:Metadata={title:'作品',description:'STORY GRID 的创意概念与数字体验。',alternates:{canonical:'/zh-CN/work',languages:{en:'/en/work','zh-CN':'/zh-CN/work'}}};
export default function ChineseWorkPage(){return <main className="inner-page"><PageIntro index="02 / 精选作品" title={<>让创意动起来。<br/><em>让作品有意义。</em></>} copy="这里展示创意方向与数字体验的精选案例。当前内容为概念研究，并非客户项目。"/><section className="work-grid work-grid-page">{projects.map((project,i)=><ProjectCard key={project.title} project={project} index={i} localized/>)}</section></main>;}
