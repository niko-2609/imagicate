'use client'
import { connectToDatabase } from '@/lib/database/mongoose'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [conn, setConn] = useState<any>();

  useEffect(() => {
    const getConnection = async () => {
      const connection = await connectToDatabase();
      setConn(connection)
      console.log(connection)
    }

    getConnection()
  },[conn])

  return (
    <div>
      <p>Home</p>
    </div>
  )
}

export default Home
