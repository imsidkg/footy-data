import { Search } from 'lucide-react'
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div>
        
        <div className='flex justify-between m-5'>
            <div className='text-4xl'>
                Logo
            </div>
            <div className='text-2xl'>
                Players 
            </div>
            <div className='text-2xl'>
                Teams
            </div>
            <div >
            <Search className='size-8 '/>
            </div>
        </div>
    </div>
  )
}

export default Navbar