"use client"


import fetcher from "@/lib/fetcher";
import Link from "next/link";

import useSWR from "swr";

export default function DocListPage() {
  const {data, isLoading, error} = useSWR("/api/documents/", fetcher)
  const isResultsArray = Array.isArray(data)
  const results = data && isResultsArray ? data : []
  console.log(results)
  return <>
  <div className="max-w-2xl mx-auto px-4">
  <ul className="list-disc pl-6 space-y-2 mt-4">
    {results.map((doc, idx)=>{
        const docLink = `/docs/${doc.id}`
        return <li key={`doc-${doc.id}-${idx}`}
          className="text-gray-700 hover:text-gray-900 hover:underline"
        >
            <Link href={docLink}>Doc ({doc.id})</Link> 
        </li>
    })}
    </ul>
    </div>
  </>
}
