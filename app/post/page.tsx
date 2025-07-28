'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function PostPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  // 🔒 認証ガード：未ログインなら /login に飛ばす
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/login')
      }
    }
    checkAuth()
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('ideas').insert([
      {
        title,
        description,
        likes: 0,
        created_at: new Date().toISOString(),
      }
    ])

    if (error) {
      console.error('投稿エラー:', error.message)
      setMessage(`投稿失敗：${error.message}`)
    } else {
      setMessage('投稿完了！')
      setTitle('')
      setDescription('')
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">新しいアイデアを投稿</h1>

        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
          required
        />

        <textarea
          placeholder="アイデアの説明"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
          rows={6}
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded"
        >
          投稿する
        </button>

        {message && <p className="text-center text-sm mt-2 text-green-400">{message}</p>}
      </form>
    </div>
  )
}
