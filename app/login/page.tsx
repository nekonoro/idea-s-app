'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.log('ログイン失敗:', error.message)
      setMessage(`ログイン失敗：${error.message}`)
    } else {
      console.log('ログイン成功:', data)
      setMessage('ログイン成功！')
      router.push('/mypage') // ✅ ログイン後はマイページへ
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 text-black">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4 bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-center">ログイン</h1>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          ログインする
        </button>
        {message && <p className="text-center text-sm mt-2 text-red-500">{message}</p>}
      </form>
    </div>
  )
}
