"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { adminProps } from "../invoices/page";

export default function Projects() {
  const [projects, setProjects] = useState<adminProps[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/admin/projects");
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleDateChange = (id: string, field: string, value: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const handleSaveDates = async (id: string) => {
    const project = projects.find((project) => project._id === id);
    try {
      await axios.patch(`/api/admin/projects/${id}`, {
        startDate: project?.startDate,
        dueDate: project?.dueDate,
      });
      alert("Dates updated successfully!");
    } catch (error) {
      console.error("Error updating project dates:", error);
      alert("Error updating project dates.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-600">
        Projects
      </h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="py-4 px-6 text-left">Name</th>
            <th className="py-4 px-6 text-left">Email</th>
            <th className="py-4 px-6 text-left">Start Date</th>
            <th className="py-4 px-6 text-left">Due Date</th>
            <th className="py-4 px-6 text-left">Status</th>
            <th className="py-4 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} className="hover:bg-gray-100">
              <td className="py-4 px-6 border-b border-gray-300">
                {project.name}
              </td>
              <td className="py-4 px-6 border-b border-gray-300">
                {project.email}
              </td>
              <td className="py-4 px-6 border-b border-gray-300">
                <input
                  type="date"
                  value={
                    project.startDate
                      ? new Date(project.startDate).toISOString().substring(0, 10)
                      : ""
                  }
                  onChange={(e) => handleDateChange(project._id, "startDate", e.target.value)}
                  className="p-2 border rounded"
                />
              </td>
              <td className="py-4 px-6 border-b border-gray-300">
                <input
                  type="date"
                  value={
                    project.dueDate
                      ? new Date(project.dueDate).toISOString().substring(0, 10)
                      : ""
                  }
                  onChange={(e) => handleDateChange(project._id, "dueDate", e.target.value)}
                  className="p-2 border rounded"
                />
              </td>
              <td className="py-4 px-6 border-b border-gray-300">
                {project.progress}
              </td>
              <td className="py-4 px-6 border-b border-gray-300">
                <button
                  onClick={() => handleSaveDates(project._id)}
                  className="p-2 bg-purple-600 text-white rounded"
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
