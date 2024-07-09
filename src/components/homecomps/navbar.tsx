import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'

const Navbar = async () => {

    const session = await getServerSession(authOptions);

  // if (session) redirect("/");
  console.log(session)

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-center w-full  items-center bg-transparent z-20 ">
      <div className='w-[70%] flex justify-between items-center'>
      <div className="text-2xl font-bold">Pixlab</div>
    {/* <ul className="flex gap-8 max-md:hidden">
      <li><Link href="/">Home</Link></li>
      <li><Link href="#">About</Link></li>
      <li><Link href="#">Prices</Link></li>
    </ul> */}
    <div className="flex gap-4">
  {session ? (
    <Link href="/welcome">
      <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 duration-100 ease-in-out">Continue to Projects</button>
    </Link>
  ) : (
    <>
      <Link href="/auth/login">
        <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 duration-100 ease-in-out">Login</button>
      </Link>
      <Link href="/auth/signup">
        <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 duration-100 ease-in-out">Register</button>
      </Link>
    </>
  )}
</div>

      </div>
    
  </nav>
  )
}

export default Navbar
