"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useParams } from "next/navigation";

export default function EditDraft() {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const fetchDraft = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/draftprojects/${id}`);
          const draft = response.data.project;
          setName(draft.name);
          setEmail(draft.email);
          setService(draft.service);
          setMessage(draft.message);
          if (!response) {
            return <p>Loading...</p>;
          }
        } catch (error) {
          console.error("Error fetching draft:", error);
        }
      }
    };

    fetchDraft();
  }, [id]);





  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = { name, email, service, message };
      const response = await axios.put(`/api/draftprojects/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.message === "Project updated successfully") {
        alert("Draft updated successfully!");
        setShouldRedirect(true); // Redirect to drafts list after update
      } else {
        alert("Failed to update draft.");
      }
    } catch (error) {
      console.error("Error updating draft:", error);
      alert("Error updating draft.");
    }
  };

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/drafts");
    }

  }, [shouldRedirect, router]);
  const handleDeleteDraft = async () => {
    try {
      const response = await axios.delete(`/api/deletebyid/${id}`);
      if (response.data.message === "Project deleted successfully") {
        alert("Draft deleted successfully!");
        setShouldRedirect(true)
      } else {
        alert("Failed to delete draft.");
      }
    } catch (error) {
      console.error("Error deleting draft:", error);
      alert("Error deleting draft.");
    }
  };
  // IF YOU HAVE THE CHANCE RE-FACTOR THE PROCEED TO PAYMENT CODE AND PASS ID AS PARAMS AND FETCH /SET THE DATA INTEAD OF PASSING THEM IN THE URL
  const handleProceedToPayment = () => {
    router.push(`/payment/${id}`);
  };
  return (
    <div className="flex min-h-screen bg-white">
      <main className="flex w-full flex-1 flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-purple-600 mb-8 text-center">
            Edit Draft
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
                Save Draft
              </button>
            </div>
            <div>
             
            </div>
          </form>
          <button
                type="submit"
                className="w-full p-2 bg-red-600 text-white rounded"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </button>
              <button
            className="w-full p-2 bg-red-600 text-white rounded mt-4"
            onClick={handleDeleteDraft}
          >
            Delete Draft
          </button>
        </div>
      </main>
    </div>
  );
}
