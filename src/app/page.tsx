import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import WithAuth from '@/components/ui/WithAuth';

type Props = {}

const Home = (props: Props) => {
  return (
    redirect('/teams')
  )
}

export default WithAuth(Home)