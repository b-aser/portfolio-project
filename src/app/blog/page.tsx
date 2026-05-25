import { Background } from '@/components/Background'
import CommingSoon from '@/components/Blog/CommingSoon'
import { Cursor } from '@/components/Cursor'
import React from 'react'

const page = () => {

  return (
        <main className="flex-1 px-6 py-18 md:px-12 lg:px-20 ">
          <Background/>
          <Cursor/>
          <CommingSoon/>


        </main>
  )
}

export default page