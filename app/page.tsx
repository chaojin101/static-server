'use client'

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File>();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    try {
      const formData = new FormData();
      formData.set('file', file)
  
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(await response.text())
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <main>
        <form onSubmit={onSubmit}>
          <input type='file' name="file" onChange={(e) => setFile(e.target.files?.[0])} />
          <button type='submit'>Upload</button>
        </form>
      </main>
    </>
  );
}
