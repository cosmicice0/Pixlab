import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: any) => {
  if (req.method === "POST") {
    const body = await req.json();
    const {  name, email,  description, price, } = body;
    const projectId = body._id
    const redirectUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://regalem.vercel.app"
    console.log("Dets", body)
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name,
                description,
              },
              unit_amount: price * 100, // price in cents
            },
            quantity: 1,
          },
        ],
        
        mode: "payment",
        success_url: `${redirectUrl}/checkout-success?id=${projectId}`,
        cancel_url: `${redirectUrl}/checkout-cancel`,
      });
      console.log(session)
      console.log(session.url)
      return NextResponse.json({ sessionId: session.id, paymentUrl:session.url });
    } catch (error: any) {
      return NextResponse.json({ error: error.message });
    }
  } else {
    return NextResponse.json("Method Not Allowed");
  }
}
