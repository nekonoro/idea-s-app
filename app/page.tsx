'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'


type Idea = {
  id: string
  title: string
  description?: string
  summary?: string
  likes: number
  created_at: string
}

export default function HomePage() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)
  const LIMIT = 10

  const fetchIdeas = async (from = 0) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, from + LIMIT - 1)

    if (error) {
      console.error('取得エラー:', error)
    } else {
      if (data && data.length < LIMIT) setHasMore(false)
      if (data) setIdeas(prev => [...prev, ...data])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchIdeas()
  }, [])

  const lastIdeaRef = useCallback(
    (node: Element | null) => {
      if (loading || !node) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchIdeas(ideas.length)
        }
      })

      observer.current.observe(node)
    },
    [loading, hasMore, ideas]
  )

  const handleLike = async (id: string, currentLikes: number) => {
    const { error } = await supabase
      .from('ideas')
      .update({ likes: currentLikes + 1 })
      .eq('id', id)

    if (error) {
      console.error('いいねエラー:', error)
    } else {
      setIdeas(prev =>
        prev.map(idea =>
          idea.id === id ? { ...idea, likes: currentLikes + 1 } : idea
        )
      )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-3xl mx-auto">
      {/* ナビゲーションバー */}
      <nav className="mb-6 space-x-4 text-blue-400">
        <Link href="/login" className="hover:underline">ログイン</Link>
        <Link href="/signup" className="hover:underline">サインアップ</Link>
        <Link href="/mypage" className="hover:underline">マイページ</Link>
        <Link href="/post" className="hover:underline">投稿する</Link>
      </nav>

      {/* 投稿一覧 */}
      <h1 className="text-2xl font-bold mb-4">投稿一覧</h1>
      {ideas.map((idea, index) => (
        <div
          key={idea.id}
          ref={index === ideas.length - 1 ? lastIdeaRef : null}
          className="mb-4 p-4 border border-gray-600 rounded"
        >
          <h2 className="text-lg font-semibold">{idea.title}</h2>
          <p className="text-sm text-gray-300">
            {idea.summary || idea.description || '（説明なし）'}
          </p>
          <button
            onClick={() => handleLike(idea.id, idea.likes)}
            className="mt-2 text-sm text-pink-400 hover:underline"
          >
            ❤️ {idea.likes}
          </button>
        </div>
      ))}
      {loading && <p className="text-gray-400">読み込み中…</p>}
      {!hasMore && <p className="text-gray-500">これ以上ありません</p>}
    </div>
  )
}
