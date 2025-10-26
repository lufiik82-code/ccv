import React, { useEffect, useState } from 'react'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function App(){
  const [user, setUser] = useState(localStorage.getItem('tp_user') || '');
  const [notes, setNotes] = useState([]);

  useEffect(()=> {
    if (user) fetchNotes(user);
  }, [user]);

  function fetchNotes(u){
    fetch(`${API}/notes?owner=${encodeURIComponent(u)}`)
      .then(r=>r.json())
      .then(setNotes)
      .catch(console.error);
  }

  async function handleSignup(username, password){
    const res = await fetch(`${API}/signup`, {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({username,password})
    });
    const j = await res.json();
    if (j.ok) { localStorage.setItem('tp_user', username); setUser(username); fetchNotes(username); }
    else alert(j.error || 'Signup failed');
  }

  async function handleLogin(username, password){
    const res = await fetch(`${API}/login`, {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({username,password})
    });
    const j = await res.json();
    if (j.ok) { localStorage.setItem('tp_user', username); setUser(username); fetchNotes(username); }
    else alert(j.error || 'Login failed');
  }

  function handleLogout(){
    localStorage.removeItem('tp_user'); setUser(''); setNotes([]);
  }

  async function handleCreateNote(note){
    const res = await fetch(`${API}/notes`, {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify(note)
    });
    const j = await res.json();
    if (j.ok){
      setNotes(prev => [j.note, ...prev]);
    } else {
      alert(j.error || 'Saving note failed');
    }
  }

  if (!user) {
    return (
      <div style={{maxWidth:800, margin:'40px auto', padding:20}}>
        <h1>TradingPath</h1>
        <AuthForms onSignup={handleSignup} onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div style={{maxWidth:900, margin:'24px auto', padding:20}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>TradingPath — {user}</h1>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main style={{marginTop:20}}>
        <NoteForm owner={user} onCreate={handleCreateNote} />
        <hr style={{margin:'20px 0'}} />
        <NoteList notes={notes} />
      </main>
    </div>
  );
}

function AuthForms({onSignup,onLogin}){
  const [u, setU] = React.useState('');
  const [p, setP] = React.useState('');

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr', gap:20}}>
      <div style={{padding:16,border:'1px solid #ddd', borderRadius:8}}>
        <h3>Create account</h3>
        <input placeholder="username" value={u} onChange={e=>setU(e.target.value)} />
        <input placeholder="password" type="password" value={p} onChange={e=>setP(e.target.value)} />
        <button onClick={()=>onSignup(u,p)}>Sign up</button>
      </div>
      <div style={{padding:16,border:'1px solid #ddd', borderRadius:8}}>
        <h3>Login</h3>
        <input placeholder="username" value={u} onChange={e=>setU(e.target.value)} />
        <input placeholder="password" type="password" value={p} onChange={e=>setP(e.target.value)} />
        <button onClick={()=>onLogin(u,p)}>Login</button>
      </div>
    </div>
  );
}
