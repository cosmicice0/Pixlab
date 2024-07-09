import Nav from "@/components/shared/adminNav";
import Sidebar from "@/components/shared/adminSidebar";
import UserSidebar from "@/components/shared/userSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-white h-screen">
      <UserSidebar />
      <div className="flex flex-col w-full">{children}</div>
    </div>
  );
};

export default Layout;
