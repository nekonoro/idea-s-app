'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      console.log('サインアップ失敗:', error.message)
      setMessage(`サインアップ失敗：${error.message}`)
    } else {
      console.log('サインアップ成功:', data)
      setMessage('登録メールを送信しました。メールを確認してください。')
      // 任意：router.push('/login') でログインページに遷移することもできます
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 text-black">
      <form onSubmit={handleSignup} className="w-full max-w-md space-y-4 bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-center">新規登録</h1>
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
          className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >
          登録する
        </button>
        {message && <p className="text-center text-sm mt-2 text-blue-500">{message}</p>}
      </form>
    </div>
  )
}
