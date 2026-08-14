"use client";

import { ChangeEvent, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleGenerate() {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      setResponse(data.response || "No response returned.");
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong. Please check the backend server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="text-4xl font-bold mb-2">AI App Starter Kit</h1>

        <p className="text-slate-400 mb-6">
          Build & Deploy Your First AI Application
        </p>

        <textarea
          value={prompt}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setPrompt(e.target.value)
          }
          placeholder="Ask AI anything..."
          className="w-full h-40 rounded-xl bg-slate-800 border border-slate-700 p-4 mb-4 text-white"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black px-5 py-3 rounded-xl font-semibold"
        >
          {loading ? "Generating..." : "Generate Response"}
        </button>

        {response && (
          <div className="mt-6 rounded-xl border border-slate-700 bg-slate-800 p-4">
            <h2 className="text-xl font-semibold mb-2">AI Response</h2>

            <p className="text-slate-300 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </main>
  );
}