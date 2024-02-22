'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [user] = useState<string>('KIM')

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <main className="flex min-h-screen flex-col items-center h-auto   pt-10">
      <div className=" flex justify-center font-bold text-2xl  h-auto w-full text-green-500 ">STAR WAR</div>

    </main>
  )
}
