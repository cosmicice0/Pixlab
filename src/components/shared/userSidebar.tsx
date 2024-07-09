"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [selected, setSelected] = useState("Welcome");
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()

  const menuItems = [
    { name: "Welcome", path: "/welcome" },
    { name: "New Project", path: "/newproject" },
    { name: "Drafts", path: "/drafts" },
    { name: "Progress", path: "/progress" },
  ];

  
  useEffect(() => {
    if (session?.user?.email) {
      const email = session.user.email;
      const username = email.split("@")[0];
      setUsername(username);
    }
    if(!session){
      router.push("/auth/login")
    }
  }, [session]);
  
 const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <aside className="w-1/4 h-screen bg-slate-100 shadow-md border-r-2 border-purple-200">
      <div className="flex flex-col h-full p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-semibold text-gray-800">
            <span className="text-purple-500">Rigalem</span>
          </div>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2 my-4">
            <li className="text-2xl font-medium text-red-500 mb-4">
              {" "}
              {username || "Username"}
            </li>
            {menuItems.map((item) => (
              <li key={item.name} onClick={() => setSelected(item.name)}>
                <Link href={item.path}>
                  <p
                    className={`block cursor-pointer p-2 rounded-lg ${
                      selected === item.name
                        ? "bg-purple-100 text-purple-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
         
          <div className="mt-auto relative">
          <button onClick={toggleModal} className="flex items-center text-gray-600 focus:outline-none">
            <FaUser className="w-6 h-6" />
          </button>
          {isModalOpen && (
            <div className="whitespace-nowrap absolute overflow-hidden -top-14 left-[-2] flex flex-col text-sm shadow-2xl rounded-md text-gray-700 hover:bg-gray-200 border-gray-400 border-4">
              <button
                onClick={() => signOut()}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
