import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const SignOut = (props: Props) => {
  return (
    // <div>SignOut</div>
    redirect('/signin')
  )
}

export default SignOut