'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export default function NavBar() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data.user) {
        setUser(data.user)
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="bg-gray-900 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link href="/">S-IDEA</Link>
      </h1>
      <nav className="space-x-4">
        <Link href="/">投稿一覧</Link>
        <Link href="/post">投稿する</Link>
        <Link href="/mypage">マイページ</Link>

        {user ? (
          <>
            <span className="text-gray-400">{user.email}</span>
            <button onClick={handleLogout} className="text-red-400 hover:underline">
              ログアウト
            </button>
          </>
        ) : (
          <>
            <Link href="/login">ログイン</Link>
            <Link href="/signup">サインアップ</Link>
          </>
        )}
      </nav>
    </header>
  )
}
