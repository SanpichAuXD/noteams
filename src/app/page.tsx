import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Home = (props: Props) => {
  return (
    redirect('/signup')
  )
}

export default Home