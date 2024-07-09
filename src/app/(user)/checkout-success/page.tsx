// pages/checkout-success.js
"use client"
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';import Head from 'next/head';

 function CheckoutSuccessComponent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const updateInvoiceStatus = async () => {
      if (id) {
        try {
          const response = await axios.put(`/api/update-payment/${id}`, null, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response.data.message);
        } catch (error) {
          console.error("Error updating invoice:", error);
        }
      }
    };

    updateInvoiceStatus();
  }, [id])

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <Head>
        <title>Payment Successful</title>
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center p-4 ">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-8">Payment Successful!</h1>
          <p className="text-lg text-gray-800 mb-4">
            Your payment was successful. Thank you for your purchase.
          </p>
          <p className="text-lg text-gray-800 mb-4">
            You will receive an email confirmation shortly.
          </p>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700"
            onClick={() => window.location.href = '/'}
          >
            Go to Home
          </button>
        </div>
      </main>
    </div>
  );
}
export default function CheckoutSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessComponent />
    </Suspense>
  );
}
