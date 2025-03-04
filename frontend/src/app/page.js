"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";



export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-start justify-items-center 
      min-h-screen p-2 pb-20 gap-8 sm:p-10 
      font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start">

      

         <Button variant='outline' asChild>
            <Link href='/docs/create'>Create new doc</Link>
          </Button>
          <Button asChild>
            <Link href='/docs'>View Docs</Link>
          </Button>
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
