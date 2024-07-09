"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  
  useEffect(() => {
    if (shouldRedirect) {
      router.push('/auth/admin/login');
    } else {
     router.push('/admin/order');

    }
  }, [shouldRedirect, router]);

  const handleLogout = () => {
    signOut({ redirect: false });
    setShouldRedirect(true); // Trigger redirection after logging out
  };

  return (
    <div className="w-full bg-[#333] text-white p-4 flex justify-around items-center fixed top-0 left-0 z-10 border-b border-gray-300">
      <div className="flex flex-1 z-40 justify-center items-center">
        <p className="text-xl font-bold text-white">
          Welcome, Admin
        </p>
      </div>
      <div className="flex flex-1 justify-end w-[80%]">
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Nav;
