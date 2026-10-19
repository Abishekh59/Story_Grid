'use client';
import { useState } from 'react';
import type { FormEvent } from 'react';

const copy={
  en:{intro:'TELL US A LITTLE ABOUT IT',name:'Name',business:'Business name',email:'Email',phone:'Phone',service:'Service interested in',selectService:'Select a service',budget:'Estimated budget (optional)',selectBudget:'Choose a range',message:'Project description',messageHint:'What are you hoping to make happen?',send:'Send your inquiry',sending:'Sending…',success:'Thanks for reaching out. Your message is on its way.',genericError:'Please try again or email us directly.',invalid:'Check your name, email, and project description, then try again.',unavailable:'The contact form is not connected yet. Please email storygridmedia1@gmail.com directly.',failed:'We could not send your message just now. Please email storygridmedia1@gmail.com.',options:['Reels & Short-Form Video','Creative Video Production','Social Media Content','Website Development','Meta Advertising','Branding & Design','Multiple Services'],budgets:['Under ¥10,000','¥10,000–¥30,000','¥30,000–¥80,000','¥80,000+','Let’s discuss']},
  zh:{intro:'告诉我们你的项目想法',name:'姓名',business:'公司名称',email:'电子邮箱',phone:'电话',service:'感兴趣的服务',selectService:'请选择服务',budget:'预计预算（选填）',selectBudget:'请选择预算范围',message:'项目说明',messageHint:'你希望实现什么？',send:'发送项目咨询',sending:'正在发送…',success:'感谢联系。你的消息已发送。',genericError:'请重试，或直接发送邮件联系我们。',invalid:'请检查姓名、邮箱和项目说明后重试。',unavailable:'联系表单尚未连接，请直接发送邮件至 storygridmedia1@gmail.com。',failed:'暂时无法发送消息，请直接发送邮件至 storygridmedia1@gmail.com。',options:['Reels 与短视频内容','创意视频制作','社交媒体内容','网站开发','Meta 广告','品牌与创意设计','多项服务'],budgets:['低于 ¥10,000','¥10,000–¥30,000','¥30,000–¥80,000','¥80,000 以上','可以进一步沟通']},
} as const;

export function ContactForm({language='en'}:{language?:'en'|'zh'}) {
  const [state,setState]=useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [feedback,setFeedback]=useState('');
  const text=copy[language];
  async function submit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState('sending'); setFeedback('');
    const form=e.currentTarget;
    const data=Object.fromEntries(new FormData(form).entries());
    try {
      const res=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      const result=await res.json();
      if(!res.ok){const message=String(result.error||'');const localized=language==='zh'?(message.includes('not connected')?text.unavailable:message.includes('Check your name')?text.invalid:text.failed):message;throw new Error(localized||text.genericError);}
      setState('sent'); setFeedback(text.success); form.reset();
    } catch(err) { setState('error'); setFeedback(err instanceof Error?err.message:text.genericError); }
  }
  return <form className="contact-form" onSubmit={submit}>
    <p className="eyebrow">{text.intro}</p>
    <label>{text.name} *<input name="name" autoComplete="name" required minLength={2} maxLength={120}/></label>
    <div className="form-pair"><label>{text.business}<input name="business" autoComplete="organization" maxLength={160}/></label><label>{text.email} *<input name="email" type="email" autoComplete="email" required maxLength={254}/></label></div>
    <div className="form-pair"><label>{text.phone}<input name="phone" type="tel" autoComplete="tel" maxLength={80}/></label><label>{text.service}<select name="service" defaultValue=""><option value="" disabled>{text.selectService}</option>{text.options.map((option)=><option key={option} value={option}>{option}</option>)}</select></label></div>
    <label>{text.budget}<select name="budget" defaultValue=""><option value="">{text.selectBudget}</option>{text.budgets.map((budget)=><option key={budget} value={budget}>{budget}</option>)}</select></label>
    <label>{text.message} *<textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder={text.messageHint}/></label>
    <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
    <button className="button button-red submit-button" type="submit" disabled={state==='sending'}>{state==='sending'?text.sending:text.send} <span>↗</span></button>
    <p className={`form-feedback ${state==='error'?'feedback-error':''}`} role="status">{feedback}</p>
  </form>;
}
