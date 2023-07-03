import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <nav className="flex text-center gap-4 px-60 justify-center items-center h-80">
      <Link className="rounded bg-black text-white font-bold py-2 px-5 text-3xl" href="/">Main</ Link>
      <Link className="rounded bg-black text-white font-bold py-2 px-5 text-3xl" href="/page-01">Page 01</ Link>
      <Link className="rounded bg-black text-white font-bold py-2 px-5 text-3xl" href="/page-02">Page 02</ Link>
    </nav>
  )
}
