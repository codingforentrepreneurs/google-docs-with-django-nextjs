"use client"


import { useAuth } from "@/components/authProvider";
import fetcher from "@/lib/fetcher";
import Link from "next/link";
import { useParams } from "next/navigation";

import useSWR from "swr";

export default function DocDetailPage() {
  const {docId} = useParams()
  const {isAuthenticated} = useAuth()
  const apiEndpoint = `/api/documents/${docId}`
  const {data, isLoading, error} = useSWR(apiEndpoint, fetcher)
  console.log(data)
  const isResultsArray = Array.isArray(data)
  const results = data && isResultsArray ? data : []
  console.log(results)
  if (error) {
    if (!isAuthenticated && error.status === 401) {
      window.location.href='/login'
    }
    if (isAuthenticated && error.status === 401) {
      return <div>Invite required</div>
    }
    if (error.status === 404) {
      return <div>Doc not found</div>
    }
    return <div>{error.message} {error.status}</div>
  }
  return <>
  <div className="max-w-2xl mx-auto px-4">
    <h1 className='text-4xl font-bold mb-4'>Documents</h1>
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
