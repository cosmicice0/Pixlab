import Stripe from "stripe"
import { NextResponse, NextRequest } from "next/server"
import { connectDb } from "@/utils/connectDb"
import ProjectDescription from "@/models/projectDescription"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req:NextRequest,) {
    const payload = await req.text()
    const res = JSON.parse(payload)
    console.log("PAYLOEAD",payload)
    const sig = req.headers.get("Stripe-signature")

    try{
        let event = stripe.webhooks.constructEvent(
            payload,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET_PROD!
        )
        console.log("event", event.type)
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
      
            // Update your database here
            const email = session.customer_email;
      
            await connectDb()
      
            await ProjectDescription.updateOne(
              { email },
              {
                $set: {
                  'invoice.status': 'Paid',
                  progress: 'In Progress',
                },
              }
            );
          }
        return NextResponse.json ({status: "success", event: event.type} )


    } catch(error){
        console.log(error)
        return NextResponse.json ({status: "failed",error} )

    }
}