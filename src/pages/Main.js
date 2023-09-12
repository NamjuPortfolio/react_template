import React from 'react'
import { useSelector } from 'react-redux'

function Main() {

  const a = useSelector(state => state.user)
  return (
    <>
      <p>{a}</p>
      <p></p>
      <button>변경</button>
    </>
  )
}

export default Main