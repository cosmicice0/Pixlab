"use client"
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface projectProps {
  _id:string,
  name:string,
  email:string,
  service:string,
  message:string,
  progress: string,
}

export default function Drafts() {
  const [drafts, setDrafts] = useState<projectProps[]>([]);
  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await axios.get('/api/draftprojects');
        console.log(response)
        setDrafts(response.data.userProjects);
      } catch (error) {
        console.error('Error fetching drafts:', error);
      }
    };

    fetchDrafts();
  }, []);


  return (
    <div className="flex min-h-screen bg-white">
      <Head>
        <title>Rigalem - Drafts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-purple-600 mb-8 text-center">Your Drafts</h1>
          <ul className="space-y-4">
          {drafts.map((draft) => (
              <li key={draft._id} className="border p-2 mb-2 rounded space-y-2">
                <Link href={`/drafts/${draft._id}`}>
                  <p className="text-purple-600 hover:underline text-2xl">{draft.name}</p>
                  <p className="text-gray-600">{draft.email}</p>
                  <p className="text-gray-600">{draft.service}</p>
                  <p className="text-gray-600">{draft.message}</p>
                  
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
