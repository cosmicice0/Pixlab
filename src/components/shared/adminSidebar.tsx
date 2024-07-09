import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-[#333] text-white fixed top-0 left-0 z-20 border-r border-gray-300">
      <nav className="h-full flex flex-col gap-6 py-6 px-4">
        <h1 className="text-3xl">Rigalem</h1>
        <div className="flex flex-col justify-around h-[200px]">
          <Link href="/admin/order">
            <span className="cursor-pointer hover:bg-gray-700 p-2 rounded hover:text-red-500">
              Order
            </span>
          </Link>
          <Link href="/admin/invoices">
            <span className="cursor-pointer hover:bg-gray-700 p-2 rounded hover:text-red-500">
              Invoice
            </span>
          </Link>
          <Link href="/admin/projects">
            <span className="cursor-pointer hover:bg-gray-700 p-2 rounded hover:text-red-500">
              Projects
            </span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
