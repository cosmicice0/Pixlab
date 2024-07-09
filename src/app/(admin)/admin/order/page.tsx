"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { adminProps } from "../invoices/page";

export default function Orders() {
  const [projects, setProjects] = useState<adminProps[]>([]);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

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

  const handleProgressChange = async (id: string, progress: string) => {
    try {
      await axios.patch(`/api/admin/orders/${id}`, { progress });
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === id ? { ...project, progress } : project
        )
      );
    } catch (error) {
      console.error("Error updating project progress:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/deletebyid/${id}`);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);
    formData.append("file", file);

    try {
      const response = await axios.post("/api/send-email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Email sent Successfully")
      console.log(response.data.message);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="p-8 text-black">
      <h1 className="text-4xl font-bold mb-8 text-purple-600">Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="py-4 px-6 text-left">Client Email</th>
              <th className="py-4 px-6 text-left">Project Name</th>
              <th className="py-4 px-6 text-left">Progress</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.toReversed().map((project) => (
              <tr key={project._id} className="hover:bg-gray-100">
                <td className="py-4 px-6 border-b border-gray-300">
                  {project.email}
                </td>
                <td className="py-4 px-6 border-b border-gray-300">
                  {project.name}
                </td>
                <td className="py-4 px-6 border-b border-gray-300">
                  {project.progress}
                </td>
                <td className="py-4 px-6 border-b border-gray-300">
                  <select
                    value={project.progress}
                    onChange={(e) =>
                      handleProgressChange(project._id, e.target.value)
                    }
                    className="p-2 border rounded bg-white"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Halted">Halted</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 bg-red-600 text-white rounded hover:bg-red-700 ml-4"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form
        onSubmit={handleEmailSubmit}
        className="space-y-4 mt-8 bg-white p-6 rounded-lg shadow-lg"
      >
        <div>
          <label className="block text-gray-700">Client Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Upload ZIP File</label>
          <input
            type="file"
            accept=".zip"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Send Email
        </button>
      </form>
    </div>
  );
}
