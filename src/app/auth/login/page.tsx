import LoginForm from '@/components/loginForm'
import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Login() {
  const session = await getServerSession(authOptions);
  

  if (session) redirect("/welcome");

  return <LoginForm />;
}