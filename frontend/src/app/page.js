"use client"

import { useAPI } from "@/components/apiProvider";
import fetcher from "@/lib/fetcher";

import Image from "next/image";
import useSWR from "swr";

export default function Home() {
  const { isHealthy, isLoading: isAPIHealthyLoading } = useAPI();
  const {data, isLoading, error} = useSWR("/api/hello/", fetcher)
  console.log(data)
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-start justify-items-center 
      min-h-screen p-2 pb-20 gap-8 sm:p-10 
      font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        {data && JSON.stringify(data)}
        <Image
          className="w-[300px] md:w-full dark:invert"
          src="/django-nextjs-text.svg"
          alt="Next.js logo"
          width={500}
          height={284}
          priority
        />
        <ol className="space-y-2 list-inside list-decimal text-sm text-center 
          sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>
            Clone & setup the project:
            <pre className="mt-2 p-4 bg-black/[.05] dark:bg-white/[.06] rounded-lg overflow-x-auto whitespace-pre-wrap break-words">
              <code>{`git clone https://github.com/jmitchel3/django-nextjs 
cd django-nextjs`}</code>
            </pre>
          </li>
          <li>
            Setup Python environment:
            <pre className="mt-2 p-4 bg-black/[.05] dark:bg-white/[.06] rounded-lg overflow-x-auto whitespace-pre-wrap break-words">
              <code>{`python3.12 -m venv venv
source venv/bin/activate
pip install rav pip-tools
rav run api-install
`}</code>
            </pre>
          </li>
          <li>
            Setup Next.js environment:
            <pre className="mt-2 p-4 bg-black/[.05] dark:bg-white/[.06] rounded-lg overflow-x-auto whitespace-pre-wrap break-words">
              <code>{`rav run frontend-install
rav run ui
`}</code>
            </pre>
          </li>
          <li>
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.js
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
          <li className="flex items-center gap-2">
            Django API Health:{" "}
            {isAPIHealthyLoading ? (
              <span className="flex items-center gap-1 text-gray-500">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Loading...
              </span>
            ) : isHealthy ? (
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                OK
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                NOT OK
              </span>
            )}
          </li>
          <li className="flex items-center gap-2">
            Next.js Health:{" "}
            <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Great (you are looking at it)
            </span>
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent 
              transition-colors flex items-center justify-center bg-foreground 
              text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] 
              text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://github.com/jmitchel3/django-nextjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/django-nextjs.svg"
              alt="Django Next.js logomark"
              width={20}
              height={20}
            />
            Download
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] 
              dark:border-white/[.145] transition-colors flex items-center 
              justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] 
              hover:border-transparent text-sm sm:text-base h-10 sm:h-12 
              px-4 sm:px-5 sm:min-w-44 cursor-not-allowed opacity-50"
            href="#"
            onClick={(e) => e.preventDefault()}
            aria-disabled="true"
          >
            Watch (coming soon)
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://codingforentrepreneurs.com/topics/django-nextjs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/jmitchel3/django-nextjs-boilerplate"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to the code →
        </a>
      </footer>
    </div>
  );
}
