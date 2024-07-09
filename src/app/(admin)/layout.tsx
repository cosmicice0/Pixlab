import Nav from "@/components/shared/adminNav";
import Sidebar from "@/components/shared/adminSidebar";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-[#333] h-auto min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Nav />
        <main className="ml-64 mt-16 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
