import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import IonIcon from '@reacticons/ionicons';
import { Link } from 'react-router-dom';

const Header = () => {
  const Links = [
    { name: "HOME", link: "/" },
    { name: "SERVICE", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "CONTACT", link: "/" },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div className='shadow-md w-full fixed top-0 border-b-2 border-b-amber-900 left-0'>
      <div className='container md:flex items-center justify-between bg-white py-6 '>
        <Link to="/" className='font-bold text-indigo-800  tracking-tight text-2xl cursor-pointer flex items-center font-[Poppins] '>
          FOODELIVERY
        </Link>

        <div onClick={() => setOpen(!open)} className='text-3xl text-orange-800 absolute right-8 top-6 cursor-pointer md:hidden'>
          <IonIcon name={open ? 'close' : 'menu'} />
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute gap-4 md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
          {
            Links.map((link) => (
              <li key={link.name} className='md:ml-8 text-base font-bold md:my-0 my-7'>
                <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
              </li>
            ))
          }
          <Button>
            Log In
          </Button>
        </ul>
      </div>
    </div>
  )
}

export default Header
