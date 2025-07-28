'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('ideas').select();
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Supabase接続テスト</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
