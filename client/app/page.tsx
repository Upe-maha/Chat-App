import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold">ChatApp</span>
          <nav className="space-x-4 text-sm">
            <a className="hover:underline" href="/login">
              Login
            </a>
            <a className="hover:underline" href="/register">
              Sign up
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-bold leading-tight">
          Real‑time chat, simple and fast.
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Send messages instantly, share files, and stay connected with your
          teams and friends.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/register"
            className="rounded bg-black px-5 py-3 text-sm font-semibold text-white"
          >
            Get started
          </a>
          <a
            href="/login"
            className="rounded border px-5 py-3 text-sm font-semibold"
          >
            I already have an account
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold">Fast messaging</h3>
            <p className="mt-2 text-sm text-gray-600">
              Low‑latency Socket.IO messages for instant delivery.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold">File sharing</h3>
            <p className="mt-2 text-sm text-gray-600">
              Upload images, videos, and documents securely.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold">Simple UI</h3>
            <p className="mt-2 text-sm text-gray-600">
              Clean, minimal interface focused on conversation.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-gray-500">
          © 2026 ChatApp. All rights reserved.
        </div>
      </footer>
    </main>
  );
}