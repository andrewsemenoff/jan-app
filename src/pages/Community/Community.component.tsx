import React from 'react'
import { useParams } from 'react-router-dom'

const Community = () => {
    const {community_name} = useParams();
  return (
    <h1>{community_name}</h1>
  )
}

export default Community