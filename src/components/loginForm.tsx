"use client"
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { z } from "zod";
interface errorProps {
  email:string,
password: string;

}

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<errorProps>({
    email: "",
    password: "",
  });
  const [statusError, setStatusError] = useState<string>("");
  const [responseUrl, setResponseUrl] = useState<string>("")

  const router = useRouter();

  const schema = z.object({
    email: z.string().email("Invalid Email "),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse({
      email,
      password,
    });
    console.log(result);

    if (!result.success) {
      const errorMessages = result.error.errors.reduce((acc: any, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setErrors(errorMessages);
    } else {
      //   setErrors({});
      // Handle successful form submission
      console.log("Form data is valid", result.data);
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log(res);

      if (res?.url) {
        setResponseUrl(res.url);
      } else if (res?.error) {
        setStatusError("Invalid email or Password");
      } else {
        setStatusError("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (responseUrl) {
      router.push('/welcome');
    }
  }, [responseUrl, router]);
  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#333] text-white">
      <div className="bg-[#333] p-8  w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          {/* <Image src="/path/to/logo.png" alt="Logo" className="h-12 mb-4" /> */}
          <h1 className="text-2xl font-bold">Login to Pixlab</h1>
      
          <p className="mt-2 text-gray-400 text-center">
            Here you can login to view active orders.
          </p>
        </div>
        {/* <button onClick={() => signIn("discord", {  redirect: true,})} className="w-full py-2 mb-4 bg-gray-600 text-white rounded-lg flex items-center justify-center hover:scale-105">
        <FaDiscord size={30} className="mr-3 text-blue-400"/>

         Login With Discord
        </button> */}
        <div className="flex flex-col mb-4 justify-center items-center">
          <hr className="border-gray-700" />
          {/* <span className="">
            OR
          </span> */}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#5D5D5D] border border-gray-600 rounded-lg text-white"
              placeholder="example@pixlab.co.uk"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mb-2">{errors.email}</p>
          )}
          <div>
            <label htmlFor="password" className="block text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#5D5D5D]  border border-gray-600 rounded-lg text-white"
              placeholder="**********"
            />
            {errors.password && (
            <p className="text-red-500 text-xs mb-2">{errors.password}</p>
          )}
            <Link
              href="/forgot-password"
              className="text-sm text-gray-400  block text-right mt-2 underline cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>
          <button type="submit" className="w-full py-2 bg-red-600 rounded-lg">
            Login
          </button>
          <div>
            <p>New here? <Link href="/auth/signup" className="underline cursor-pointer">Create a Pixlab Account</Link></p>
          </div>
        </form>
      </div>
      <footer className="mt-6 text-gray-400 flex w-full justify-center items-center">
        <p>&copy; Pixlab 2024 | All Rights Reserved</p>
        {/* <Link href="/privacy-policy" className="ml-2 underline cursor-pointer">
          Privacy Policy
        </Link> */}
      </footer>
    </div>
  );
};

export default LoginForm;
