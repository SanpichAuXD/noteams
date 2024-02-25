import React from 'react'

type Props = {}

const File = ({ params }: { params: { teamId: string } }) => {
  return (
    <div>File {params.teamId}</div>
  )
}

export default File