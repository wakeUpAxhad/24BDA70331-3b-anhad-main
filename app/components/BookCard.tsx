"use client";

import React from "react";

type Props = {
  id: string;
  title: string;
  author: string;
  onRemove: (id: string) => void;
};

export default function BookCard({ id, title, author, onRemove }: Props) {
  return (
    <div className="w-full rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-black">
            {title}
          </h3>
          <p className="mt-2 text-black">by {author}</p>
        </div>
        <div>
          <button
            onClick={() => onRemove(id)}
            className="inline-flex h-10 items-center rounded-md bg-red-600 px-4 py-2 text-white shadow-sm hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
