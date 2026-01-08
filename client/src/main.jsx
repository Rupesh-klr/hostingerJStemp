import { useEffect, useState } from 'react';

export default function App() {
 const [message, setMessage] = useState('Loading...');

 useEffect(() => {
 fetch('/api/hello')
 .then(r => r.json())
 .then(d => setMessage(d.message))
 .catch(() => setMessage('Error calling API'));
 }, []);

 return (
 <div>
 <h1>React + Express + Vite on Hostinger</h1>
 <p>{message}</p>
 </div>
 );
}