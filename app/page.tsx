"use client";

import React, { useMemo, useState } from "react";
import BookCard from "./components/BookCard";

type Book = { id: string; title: string; author: string };

export default function Home() {
  const [books, setBooks] = useState<Book[]>([
    { id: "1", title: "The Great Gatsby", author: "S. Scott Fitzgerald" },
    { id: "2", title: "To Kill a Mockinbird", author: "Harper Lee" },
    { id: "3", title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  ]);

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return books;
    return books.filter(
      (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }, [books, search]);

  function addBook() {
    if (!title.trim() || !author.trim()) return;
    const b: Book = { id: String(Date.now()), title: title.trim(), author: author.trim() };
    setBooks((s) => [b, ...s]);
    setTitle("");
    setAuthor("");
  }

  function removeBook(id: string) {
    setBooks((s) => s.filter((b) => b.id !== id));
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-3xl space-y-6 px-6">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Library Management System
        </h1>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm text-black">
          <div className="space-y-4">
            <input
              aria-label="Search books"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-zinc-200 px-4 py-3 shadow-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white"
            />

            <div className="flex gap-3">
              <input
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 rounded-md border border-zinc-200 px-4 py-3 shadow-sm placeholder:text-zinc-500 focus:outline-none text-black bg-white"
              />
              <input
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="flex-1 rounded-md border border-zinc-200 px-4 py-3 shadow-sm placeholder:text-zinc-500 focus:outline-none text-black bg-white"
              />
              <button
                onClick={addBook}
                className="ml-2 inline-flex items-center rounded-md bg-white border border-blue-600 px-4 py-3 text-black shadow hover:bg-blue-50"
              >
                Add Book
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <p className="text-center text-zinc-600">No books found.</p>
          ) : (
            filtered.map((b) => (
              <BookCard key={b.id} id={b.id} title={b.title} author={b.author} onRemove={removeBook} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

