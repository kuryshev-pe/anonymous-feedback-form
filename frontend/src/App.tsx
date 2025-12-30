import React, { useEffect, useState } from 'react';
/* Используется только для отладки. 
import { fetch } from './api/mockApi'; */

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('/api/message')
      .then(res => res.json())
      .then(res => setData(res.message));
  }, []);

  return (
    <div>
      <h1>Анонимная форма обратной связи</h1>
      <p>Кто знает, тот войдет: {data}</p>
    </div>
    
  );
}

export default App;
