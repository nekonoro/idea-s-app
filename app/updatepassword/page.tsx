'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data, error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      console.log('更新失敗:', error.message)
      setMessage(`更新失敗：${error.message}`)
    } else {
      setMessage('パスワードを更新しました！ログイン画面に移動します')
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleUpdate} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">新しいパスワード設定</h1>
        <input
          type="password"
          placeholder="新しいパスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          パスワードを更新する
        </button>
        {message && <p className="text-center text-sm mt-2 text-green-400">{message}</p>}
      </form>
    </div>
  )
}
