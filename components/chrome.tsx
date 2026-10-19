'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const links = [['Services','/services'],['Work','/work'],['About','/about'],['Contact','/contact']];
export function Brand({ light=false, lockup=false }: { light?: boolean; lockup?: boolean }) { const pathname=usePathname()||'/';const chinese=pathname.startsWith('/zh');const fullLogo=light?'/brand/story-grid-logo-light.png':'/brand/story-grid-logo-dark.png';const emblem=light?'/brand/story-grid-emblem-light.png':'/brand/story-grid-emblem-dark.png';return <Link className={`brand ${light ? 'brand-light' : ''} ${lockup?'brand-lockup':''}`} href={chinese?'/zh-CN':'/en'} aria-label={chinese?'STORY GRID 首页':'STORY GRID home'}>{lockup?<Image className="brand-full-image" src={fullLogo} width={1000} height={834} alt=""/>:<><span className="brand-seal" aria-hidden="true"><Image src={emblem} width={353} height={400} alt=""/></span><span className="brand-type"><b>STORY GRID</b><small>IDEAS IN MOTION</small></span></>}</Link>; }
export function SiteHeader() {
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const menuRef=useRef<HTMLElement>(null);
  const toggleRef=useRef<HTMLButtonElement>(null);
  const pathname=usePathname()||'/'; const chinese=pathname.startsWith('/zh');
  const normalizedPath=pathname.replace(/^\/(?:en|zh-CN|zh)(?=\/|$)/,'')||'/';
  const lightHeader=normalizedPath.startsWith('/services')||['/work','/about','/contact','/privacy'].includes(normalizedPath);
  const routeTail=normalizedPath==='/'?'':normalizedPath;
  const englishHref=`/en${routeTail}`;
  const chineseHref=`/zh-CN${routeTail}`;
  const rememberLocale=(locale:'en'|'zh-CN')=>{document.cookie=`NEXT_LOCALE=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;setOpen(false)};
  useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>24);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);
  useEffect(()=>{
    if(!open)return;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const getItems=()=>menuRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])') ?? [];
    getItems()[0]?.focus();
    const onKeyDown=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();setOpen(false);toggleRef.current?.focus();return;}
      if(event.key!=='Tab')return;
      const items=getItems();if(!items.length)return;
      const first=items[0],last=items[items.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    };
    window.addEventListener('keydown',onKeyDown);
    return()=>{document.body.style.overflow=previousOverflow;window.removeEventListener('keydown',onKeyDown)};
  },[open]);
  return <header className={`site-header ${lightHeader?'header-light':''} ${scrolled?'header-scrolled':''}`}><Brand light={!lightHeader || (lightHeader && scrolled)}/><button ref={toggleRef} className={`menu-toggle ${open?'is-open':''}`} aria-expanded={open} aria-controls="primary-navigation" aria-label={open?(chinese?'关闭菜单':'Close menu'):(chinese?'打开菜单':'Open menu')} onClick={()=>setOpen(!open)}><span/><span/></button><nav ref={menuRef} id="primary-navigation" className={`main-nav ${open?'nav-open':''}`} aria-label={chinese?'主导航':'Main navigation'}>{links.map(([label,href],i)=><Link key={href} href={`${chinese?'/zh-CN':'/en'}${href}`} onClick={()=>{setOpen(false);toggleRef.current?.focus()}}>{chinese?['服务项目','作品案例','关于我们','联系我们'][i]:label}</Link>)}<Link className="header-cta" href={chinese?'/zh-CN/contact':'/en/contact'} onClick={()=>{setOpen(false);toggleRef.current?.focus()}}>{chinese?'开启合作':'Start a project'} <span aria-hidden="true">↗</span></Link><div className="language-switcher" role="group" aria-label={chinese?'语言':'Language'}><span className="language-label">{chinese?'语言':'Language'}</span><Link aria-current={!chinese?'page':undefined} href={englishHref} onClick={()=>rememberLocale('en')}>EN</Link><span className="language-divider" aria-hidden="true">|</span><Link aria-current={chinese?'page':undefined} href={chineseHref} onClick={()=>rememberLocale('zh-CN')}>中文</Link></div></nav></header>
}
export function SiteFooter() {
  const pathname=usePathname()||'/';
  const chinese=pathname.startsWith('/zh');
  const localizedPath=(path:string)=>`${chinese?'/zh-CN':'/en'}${path==='/'?'':path}`;
  const nav=[['Home','首页','/'],['Services','服务项目','/services'],['Work','作品案例','/work'],['About','关于我们','/about'],['Contact','联系我们','/contact']];
  const services=chinese?['Reels 与短视频内容','创意视频制作','社交内容策划','品牌与数字支持']:['Reels & short-form video','Creative video production','Social-first campaigns','Brand and digital support'];
  return <footer className="site-footer">
    <div className="footer-main">
      <section className="footer-brand-column"><Brand lockup/><p className="footer-slogan">{chinese?<>Reels 与短视频<br/>创意制作 / 佛山</>:<>Reels & short-form video<br/>Made in Foshan, China</>}</p><a className="footer-social" href="https://www.instagram.com/story_gridmedia/" target="_blank" rel="noreferrer"><span aria-hidden="true">◎</span> Instagram ↗</a></section>
      <section className="footer-about"><h2 className="footer-heading">{chinese?'关于':'ABOUT'}</h2><p>{chinese?'我们专注 Reels 与短视频，从创意、拍摄到剪辑，帮助品牌抓住注意力。':'We focus on Reels and short-form video, from the first idea through filming and editing, to help brands earn attention.'}</p><Link href={localizedPath('/about')}>{chinese?'认识我们':'Meet the studio'} ↗</Link></section>
      <nav className="footer-menu" aria-label={chinese?'网站导航':'Site navigation'}><h2 className="footer-heading">{chinese?'浏览':'MENU'}</h2>{nav.map(([label,zh,href])=><Link href={localizedPath(href)} key={href}>{chinese?zh:label}</Link>)}</nav>
      <section className="footer-services"><h2 className="footer-heading">{chinese?'服务':'SERVICES'}</h2>{services.map((service)=><Link href={localizedPath('/services')} key={service}>{service}</Link>)}</section>
      <section className="footer-contact"><h2 className="footer-heading">{chinese?'联系':'CONTACT'}</h2><a href="mailto:storygridmedia1@gmail.com">storygridmedia1@gmail.com</a><a href="tel:+8613288444304">+86 132 8844 4304</a><p>{chinese?'中国广东省佛山市':'Foshan, Guangdong, China'}</p><div className="footer-map"><iframe title={chinese?'佛山地图':'Map of Foshan, Guangdong, China'} src="https://maps.google.com/maps?q=Foshan%2C%20Guangdong%2C%20China&z=12&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><a className="footer-map-label" href="https://www.google.com/maps/search/?api=1&query=Foshan%2C%20Guangdong%2C%20China" target="_blank" rel="noreferrer">{chinese?'佛山 / 中国 · 打开地图':'FOSHAN, CHINA · OPEN MAP'} ↗</a></div></section>
    </div>
    <a className="footer-callout" href="mailto:storygridmedia1@gmail.com"><span>{chinese?'感谢你关注 STORY GRID。准备好让好想法动起来了吗？':'Thanks for stopping by. Have a good one in mind?'}</span><b>{chinese?'开启合作':'Start a conversation'} <i aria-hidden="true">↗</i></b></a>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} STORY GRID</span><span>IDEAS IN MOTION<span className="footer-red"> ●</span></span><Link href={localizedPath('/privacy')}>{chinese?'隐私政策':'Privacy policy'} ↗</Link></div>
  </footer>;
}
