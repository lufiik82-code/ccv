import React, { useState } from 'react';

export default function NoteForm({owner, onCreate}){
  const [type, setType] = useState('private');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const [feeling, setFeeling] = useState('');
  const [ca, setCa] = useState('');
  const [pnl, setPnl] = useState('');
  const [link, setLink] = useState('');
  const [friends, setFriends] = useState('');

  function submit(){
    const note = {
      owner,
      type,
      name,
      description,
      reason,
      feeling,
      ca,
      pnl,
      link,
      friends: friends.split(',').map(s=>s.trim()).filter(Boolean)
    };
    onCreate(note);
    // clear
    setName(''); setDescription(''); setReason(''); setFeeling(''); setCa(''); setPnl(''); setLink(''); setFriends('');
  }

  return (
    <div style={{padding:12, border:'1px solid #eee', borderRadius:8}}>
      <h3>Create Note</h3>
      <div style={{display:'flex', gap:8, marginBottom:8}}>
        <label><input type="radio" checked={type==='private'} onChange={()=>setType('private')} /> Private</label>
        <label><input type="radio" checked={type==='group'} onChange={()=>setType('group')} /> Group</label>
      </div>
      <div style={{display:'grid', gap:8}}>
        <input placeholder="Note name" value={name} onChange={e=>setName(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <input placeholder="Why did you buy it?" value={reason} onChange={e=>setReason(e.target.value)} />
        <input placeholder="How did you feel?" value={feeling} onChange={e=>setFeeling(e.target.value)} />
        <input placeholder="Coin contract address (CA)" value={ca} onChange={e=>setCa(e.target.value)} />
        <input placeholder="PnL (e.g., +50, -20)" value={pnl} onChange={e=>setPnl(e.target.value)} />
        {type==='group' && <input placeholder="Invite friends (comma-separated)" value={friends} onChange={e=>setFriends(e.target.value)} />}
        <input placeholder="Add a link (optional)" value={link} onChange={e=>setLink(e.target.value)} />
        <button onClick={submit}>Save Note</button>
      </div>
    </div>
  );
}
