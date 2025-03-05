"use client"


import { useAuth } from "@/components/authProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import fetcher from "@/lib/fetcher";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

import useSWR from "swr";

const DocEditor = dynamic( () => import( '@/components/editor/DocEditor' ), { ssr: false } );


export default function DocDetailPage() {
  const {docId} = useParams()
  const editorRef = useRef(null)
  const submitBtnRef = useRef(null)
  const [saving, setSaving] = useState(false)
  const {isAuthenticated} = useAuth()
  const apiEndpoint = `/api/documents/${docId}`
  const {data:doc, isLoading, error, mutate} = useSWR(apiEndpoint, fetcher)
  const [formError, setFormError] = useState("")

  
  if (isLoading) {
    return <div>Loading..</div>
  }
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
  async function handleSubmit (event) {
    event.preventDefault()
    setSaving(true)
    setFormError("") // Clear any previous errors
    const content = editorRef.current.editor.getData()
    const formData = new FormData(event.target)
    const objectFromForm = Object.fromEntries(formData)
    objectFromForm['content'] = content
    const jsonData = JSON.stringify(objectFromForm)
    const requestOptions = {
        method: "PUT",
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
       setSaving(false)
        mutate()
    } else {
      setSaving(false)
      console.log(data)
      setFormError(data.message || "Save failed.")
    }
}

 const handleOnSave = (editor) => {
  console.log(editor)
  submitBtnRef.current.click()
 }


  const title = doc?.title ? doc.title : "Document"
  return <>
    <div className="px-4">
      <h1 className='text-4xl font-bold mb-4'>{title}</h1>
      <form onSubmit={handleSubmit} className='space-y-2'>
      {formError && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                  {formError}
                </div>
            )}
        <Input type='text' defaultValue={doc.title} name='title' />
        <DocEditor 
          onSave={handleOnSave}
        ref={editorRef} 
        docId={docId}
        initialData={doc.content} name='content' placeholder='Write your content here!' />
        <Button  ref={submitBtnRef} type='submit'> {saving ? 'Saving' : 'Save'}</Button>
      </form>
      {saving && <p>Saving...</p>}

    </div>
  </>
}
