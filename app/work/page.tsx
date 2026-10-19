import type { Metadata } from 'next';
import { projects } from '@/lib/content';
import { PageIntro, ProjectCard } from '@/components/sections';
export const metadata: Metadata = { title: 'Work', description: 'Selected creative concepts and sample work by STORY GRID.', alternates:{canonical:'/en/work',languages:{en:'/en/work','zh-CN':'/zh-CN/work'}} };
export default function WorkPage() { return <main className="inner-page"><PageIntro index="02 / SELECTED WORK" title={<>Made to move.<br/><em>Built to mean it.</em></>} copy="A look at the ideas, images, and digital experiences that shape our approach. Concept studies are clearly marked while the portfolio takes shape."/><section className="work-grid work-grid-page">{projects.map((project,i)=><ProjectCard key={project.title} project={project} index={i}/>)}</section></main>; }
