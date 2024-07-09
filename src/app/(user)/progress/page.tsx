// pages/progress.js
"use client";
import Head from "next/head";
import classNames from "classnames";
import { useEffect, useState } from "react";
import axios from "axios";
import { projectProps } from "../drafts/page";

export default function Progress() {
  const [projects, setProjects] = useState<projectProps[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/draftprojects");
        setProjects(response.data.userProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <Head>
        <title>Rigalem - Project Progress</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-purple-600 mb-8 text-center">
            Project Progress
          </h1>
          <ul className="space-y-4">
            {projects.map((project) => (
              <li
                key={project._id}
                className="border p-4 rounded-lg hover:shadow-lg"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-purple-600">
                    {project.name}
                  </h2>
                  <div className="flex justify-start items-start space-x-2">
                    <p>Status:</p>
                    <p
                      className={classNames("text-gray-700", {
                        "text-red-600": project.progress === "Not Started",
                        "text-blue-600": project.progress === "In Progress",
                        "text-orange-600": project.progress === "Halted",
                        "text-green-600": project.progress === "Completed",
                      })}
                    >
                      {project.progress}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
