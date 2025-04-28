import React from 'react'

function layout({ children }) {
  return (
    <div className='flex w-full justify-center min-h-screen items-center'>{children}</div>
  )
}

export default layout