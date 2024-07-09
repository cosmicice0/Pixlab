"use client";
import { useState } from "react";
import axios from "axios";

export default function Project() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let amount = 0;
    switch (service) {
      case "frontend":
        amount = 100;
        break;
      case "backend":
        amount = 150;
        break;
      case "fullstack":
        amount = 250;
        break;
      default:
        amount = 0;
    }
    try {
      const formData = { name, email, service, message, amount };
      // const encodedData = new URLSearchParams(formData).toString();
      const response = await axios.post("/api/saveproject", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Project saved successfully!");
        setEmail("");
        setMessage("");
        setName("");
        setService("");
        // create and use a modal instead of an alert
      } else {
        alert("Failed to save project.");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Error saving project.");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <main className="flex w-full flex-1 flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-purple-600 mb-8 text-center">
            Start a New Project
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Service</label>
              <select
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select a service</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Fullstack</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full p-2 bg-purple-600 text-white rounded"
              >
                Start Now
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
