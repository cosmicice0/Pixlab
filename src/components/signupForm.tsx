"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa6";
import { z } from "zod";

interface errorProps {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<errorProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [statusError, setStatusError] = useState<string>("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();

  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password")
      .refine((val) => val === password, {
        message: "Passwords do not match",
      }),
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = schema.safeParse({
      email,
      password,
      confirmPassword,
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
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Contnet-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log(res);

      if (res.status === 400) {
        setStatusError("this email / user is already registered");
        console.log("registe failed");

        return;
      }
      if (res.status === 200) {
        setStatusError("");
        console.log("registed sucessfully");
        setShouldRedirect(true);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (shouldRedirect) {
      router.push("/auth/login");
    }
  }, [shouldRedirect, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#333] text-white">
      <div className="bg-[#333] p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          {/* <Image src="/path/to/logo.png" alt="Logo" className="h-12 mb-4" /> */}
          <h1 className="text-2xl font-bold">Create Pixlab Account.</h1>

          <p className="mt-2 text-gray-400 text-center">
            Create a Pixlab account to see active orders.
          </p>
        </div>
        {/* <button
          onClick={() => signIn("discord", { redirect: true })}
          className="w-full py-2 mb-4 bg-gray-600 text-white rounded-lg flex items-center justify-center hover:scale-105"
        >
          <FaDiscord size={30} className="mr-3 text-blue-400" />
          Sign Up With Discord
        </button> */}
        <div className="flex flex-col mb-4 justify-center items-center">
          <hr className="border-gray-700" />
          {/* <span>OR</span> */}
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
              className="w-full px-4 py-2 bg-[#5D5D5D] border border-gray-600 rounded-lg text-white"
              placeholder="**********"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mb-2">{errors.password}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#5D5D5D] border border-gray-600 rounded-lg text-white mb-3"
              placeholder="**********"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mb-2">
              {errors.confirmPassword}
            </p>
          )}
          <button type="submit" className="w-full py-2 bg-red-600 rounded-lg">
            Sign Up
          </button>
          <div>
            <p>
              Already have an account?{" "}
              <Link href="/auth/login" className="underline cursor-pointer">
                Login here
              </Link>
            </p>
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

export default SignupForm;
