import SignupForm from '@/components/signupForm'
import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Signup() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/welcome");


  return <SignupForm />;
}
