'use client'

import { useState } from 'react'
import { supabase } from '../../utils/supabase';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/updatepassword`,
    })

    if (error) {
      console.log('送信エラー:', error.message)
      setMessage(`送信失敗：${error.message}`)
    } else {
      setMessage('リセットリンクをメールに送信しました！')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleReset} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">パスワードリセット</h1>
        <input
          type="email"
          placeholder="登録済みメールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded"
        >
          リセットリンクを送信
        </button>
        {message && <p className="text-center text-sm mt-2 text-yellow-400">{message}</p>}
      </form>
    </div>
  )
}
