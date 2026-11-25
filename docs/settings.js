const KEY='yedu-deepseek-settings-v1';
export function loadApiSettings(storage){
 const saved=JSON.parse(storage.getItem(KEY)||'null');
 return {key:typeof saved?.key==='string'?saved.key:'',model:typeof saved?.model==='string'&&saved.model?saved.model:'deepseek-flash'};
}
export function saveApiSettings(storage,{key,model}){
 if(key)storage.setItem(KEY,JSON.stringify({key,model}));else storage.removeItem(KEY);
}
