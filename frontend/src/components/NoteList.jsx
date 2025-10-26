import React from 'react';

export default function NoteList({notes}){
  if (!notes || notes.length===0) return <div>No notes yet.</div>;
  return (
    <div style={{display:'grid', gap:12}}>
      {notes.map(n=>(
        <div key={n.id} style={{padding:12,border:'1px solid #eee',borderRadius:8,display:'flex',justifyContent:'space-between'}}>
          <div>
            <div style={{fontWeight:700}}>{n.name} {n.type==='group' && <span style={{fontSize:12,color:'#666'}}> (group)</span>}</div>
            <div style={{fontSize:13,color:'#444'}}>{n.description}</div>
            <div style={{fontSize:12,color:'#666',marginTop:6}}>Reason: {n.reason} — Feeling: {n.feeling}</div>
            <div style={{fontSize:12,color:'#666'}}>CA: {n.ca} — PnL: {n.pnl}</div>
            {n.link && <div><a href={n.link} target="_blank" rel="noreferrer">Link</a></div>}
            {n.friends && <div style={{fontSize:12,color:'#666'}}>Invited: {n.friends}</div>}
          </div>
          <div style={{textAlign:'right',minWidth:120}}>
            <div style={{fontSize:12,color:'#999'}}>{new Date(n.created_at).toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
