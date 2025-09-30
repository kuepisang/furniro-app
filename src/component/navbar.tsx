'use client'

import React from 'react'
import Image from 'next/image'
import { RiUser6Line } from 'react-icons/ri';
import { CiSearch } from 'react-icons/ci';
import { IoIosHeartEmpty } from 'react-icons/io';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import useAuthStore from '@/store/use_auth_store';

export default function Navbar() {
    const { email } = useAuthStore();

  return (
    <div>
    {/* NAVBAR SECTION */}
    <nav className='grid grid-cols-3 p-5 bg-gray-300'>
      <Image 
      src={'/static/Frame 168.png'}
      alt='Logo Furniro'
      width={185}
      height={41}
      />
      <div className='flex item-center justify-center gap-10 p-2 font-bold text-black'>
        <div>Home</div>
        <div>Shop</div>
        <div>About</div>
        <div>Contact</div>
      </div>
      <div className='flex item-center justify-end gap-5 p-1'>
        <RiUser6Line className='text-2xl' />
        {email}
        <CiSearch className='text-2xl' />
        <IoIosHeartEmpty className='text-2xl' />
        <AiOutlineShoppingCart className='text-2xl' />
      </div>
    </nav>
    </div>
  )
}
