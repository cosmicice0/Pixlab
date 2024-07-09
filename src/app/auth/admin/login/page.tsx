"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const authString = `${email}:${password}`;
    const encodedAuth = Buffer.from(authString).toString("base64");
    console.log(authString, encodedAuth);
    fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedAuth}`,
      },
    }).then((response) => {
      if (response.ok) {
        setShouldRedirect(true);
      } else {
        alert("Invalid credentials");
      }
    });
  };
  useEffect(() => {
    if (shouldRedirect) {
      router.push("/admin/invoices");
    }
  }, [shouldRedirect, router]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-purple-600 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
