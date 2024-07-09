// pages/checkout-cancel.js
"use client"
import Head from 'next/head';

export default function CheckoutCancel() {


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <Head>
        <title>Payment Canceled</title>
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-8">Payment Canceled</h1>
          <p className="text-lg text-gray-800 mb-4">
            Your payment was canceled. You can retry the payment process by clicking the button below.
          </p>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg w-full hover:bg-red-700"
            onClick={() => window.location.href = '/drafts'}
          >
            Retry Payment
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-700 mt-4"
            onClick={() => window.location.href = '/'}
          >
            Go to Home
          </button>
        </div>
      </main>
    </div>
  );
}
