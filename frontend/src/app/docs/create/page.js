"use client"


import { useAuth } from "@/components/authProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import fetcher from "@/lib/fetcher";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import useSWR from "swr";

export default function DocCreatePage() {
  // const {isAuthenticated} = useAuth()
  const apiEndpoint = `/api/documents/`
  const [formError, setFormError] = useState("")
//   if (!isAuthenticated) {
//     window.location.href='/login'
//   }
  async function handleSubmit (event) {
    event.preventDefault()
    setFormError("") // Clear any previous errors
    const formData = new FormData(event.target)
    const objectFromForm = Object.fromEntries(formData)
    const jsonData = JSON.stringify(objectFromForm)
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    }
    const response = await fetch(apiEndpoint, requestOptions)
    let data = {}
    try {
      data = await response.json()
    } catch (error) {
      
    }
    // const data = await response.json()
    if (response.ok) {
        console.log(data)
        window.location.href = `/docs/${data.id}`
        // redirect(`/docs/{data.id}`)
    } else {
      console.log(data)
      setFormError(data.message || "Save failed.")
    }
}


  const title = "Create new Document"
  return <>
    <div className="w-full lg:grid lg:min-h-[85vh]  lg:grid-cols-2 xl:min-h-[90vh]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
      <h1 className='text-4xl font-bold mb-4'>{title}</h1>
      <form onSubmit={handleSubmit} className='space-y-2'>
      {formError && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                  {formError}
                </div>
            )}
        <Input type='text' placeholder='Your new document title' name='title' />
        <Button type='submit'>Create doc</Button>
      </form>

    </div>
    </div>
    </div>
  </>
}
