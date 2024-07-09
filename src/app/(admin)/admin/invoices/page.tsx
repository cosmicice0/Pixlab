"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { projectProps } from "@/app/(user)/drafts/page";

export interface adminProps {
  createdAt: string;
  _id: string;
  invoice: any;
  startDate: string;
  dueDate: string;
  progress: string;
  email: string;
  name : string
}

export default function Invoices() {
  const [projects, setProjects] = useState<adminProps[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/admin/projects");
        console.log(response.data);
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-600">
        Invoices
      </h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="py-4 px-6 text-left">Date</th>
            <th className="py-4 px-6 text-left">Client Email</th>
            <th className="py-4 px-6 text-left">Project Name</th>
            <th className="py-4 px-6 text-left">Amount</th>
            <th className="py-4 px-6 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} className="hover:bg-gray-100">
              <td className="py-4 px-6 border-b border-gray-300">
                {new Date(project.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-6 border-b border-gray-300">
                  {project.email}
                </td>
                <td className="py-4 px-6 border-b border-gray-300">
                  {project.name}
                </td>
              <td className="py-4 px-6 border-b border-gray-300">
                {project.invoice?.amount}
              </td>
              <td className="py-4 px-6 border-b border-gray-300">
                {project.invoice?.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
