import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Home = (props: Props) => {
  return (
    redirect('/teams')
  )
}

export default Home