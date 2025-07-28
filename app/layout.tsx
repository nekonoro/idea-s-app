import '../styles/globals.css'
import NavBar from './components/NavBar'

export const metadata = {
  title: 's-idea',
  description: 'アイデア共有アプリ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-black text-white">
        <NavBar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
