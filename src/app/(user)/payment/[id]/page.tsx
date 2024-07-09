// pages/payment/[id].js
"use client";
import Head from "next/head";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { projectProps } from "../../drafts/page";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function PaymentComponent() {
  const { id } = useParams();
  const [project, setProject] = useState<projectProps>();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`/api/draftprojects/${id}`);
        const projectData = response.data.project;
        setProject(projectData);

        switch (projectData.service) {
          case "frontend":
            setPrice(100);
            break;
          case "backend":
            setPrice(150);
            break;
          case "custom":
            setPrice(250);
            break;
          default:
            setPrice(0);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, [id]);

  const handleStripePayment = async (price:any) => {
    const invoice = { ...project, price };
    try {
      const response = await axios.post("/api/checkout-session", invoice, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl; // Redirect to Stripe payment page
      } else {
        console.error("Failed to initiate payment:", response.data.error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <Head>
        <title>Rigalem - Payment Options</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center p-4 ">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold text-purple-600 mb-8">
            Payment Options
          </h1>
          <p className="text-lg text-gray-800 mb-4">
            Review your project details and proceed to payment:
          </p>
          <div className="space-y-4 mb-8 flex justify-center items-start flex-col">
            <div>
              <h2 className="text-2xl font-semibold">Project Name: {project.name}</h2>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Email: {project.email}</h2>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Service: {project.service}</h2>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Description: {project.message}</h2>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Price: ${price}</h2>
            </div>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg w-full hover:bg-purple-700"
              onClick={() => handleStripePayment(price)}
            >
              Pay with Stripe
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Payment() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentComponent />
    </Suspense>
  );
}
