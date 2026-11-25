export function normalizeWords(rows){
 if(!Array.isArray(rows)||rows.length>500)throw Error('每次请导入 1–500 个单词。');
 const seen=new Set();const words=[];
 for(const r of rows){if(!r||typeof r!=='object')continue;const word=String(r.word??r.单词??'').trim();if(!/^[a-zA-Z][a-zA-Z ’'\-().]{0,99}$/.test(word))continue;const key=word.toLowerCase();if(seen.has(key))continue;seen.add(key);const field=(k,alias='')=>String(r[k]??r[alias]??'').trim().slice(0,3000);words.push({word,meaning:field('meaning','释义'),phonetic:field('phonetic','音标'),example:field('example','例句'),translation:field('translation','例句翻译'),notes:field('notes','助记')});}
 if(!words.length)throw Error('没有识别到单词。请使用「单词 | 释义 | 例句」格式，或使用 DeepSeek 智能整理。');return words.map(w=>({...w,ai:!!rows.find(r=>r&&String(r.word??r.单词??'').trim().toLowerCase()===w.word.toLowerCase())?.ai}));
}
export function parseText(text){
 const clean=text.trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');
 if(clean.startsWith('[')||clean.startsWith('{')){try{const data=JSON.parse(clean);return normalizeWords(Array.isArray(data)?data:data.words);}catch(e){if(!(e instanceof SyntaxError))throw e;}}
 const rows=[];
 for(let line of clean.split('\n')){line=line.trim().replace(/^\s*(?:[-*•]|\d+[.)、])\s*/,'').replace(/\*\*/g,'');if(!line||/^\|?\s*[-:]+\s*\|/.test(line))continue;let cells=line.replace(/^\||\|$/g,'').split(/\s*\|\s*|\t+/);if(cells.length<2){const match=line.match(/^([a-zA-Z][a-zA-Z '\-]*?)\s*(?:[:：]|\s[-—–]\s|\s{2,})\s*(.+)$/);if(match)cells=match.slice(1);else continue;}rows.push({word:cells[0],meaning:cells[1],example:cells[2]??'',translation:cells[3]??'',notes:cells[4]??''});}return normalizeWords(rows);
}
export function schedule(card,grade,now=Date.now()){
 const interval=grade==='again'?10/1440:grade==='hard'||!card.reviews||card.hadFailure?1:Math.max(2,Math.round((Number(card.interval)||1)*2.5));
 return {...card,reviews:(card.reviews||0)+1,interval,due:now+interval*86400000,lastGrade:grade};
}
export function recognize(card,grade,hinted=false){
 const success=grade==='easy'?2:grade==='good'&&!hinted?(card.sessionSuccess||0)+1:0;
 return {...card,sessionSuccess:Math.min(success,2),encounters:(card.encounters||0)+1,hadFailure:!!card.hadFailure||grade!=='good'||hinted,pending:success<2};
}
