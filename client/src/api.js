const API='http://localhost:5000/api';
export async function api(path,options={}){const r=await fetch(API+path,{headers:{'Content-Type':'application/json',...(options.headers||{})},...options});if(!r.ok){const e=await r.json().catch(()=>({message:'Request failed'}));throw new Error(e.message||'Request failed')}return r.status===204?null:r.json()}
export const getCourses=()=>api('/courses');
export const getForms=()=>api('/feedback-forms');
export const getSummary=()=>api('/evaluations/summary');
export const submitEvaluation=(data)=>api('/evaluations',{method:'POST',body:JSON.stringify(data)});
