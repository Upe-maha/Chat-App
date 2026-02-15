import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold text-blue-600">ChatApp</span>
          <nav className="flex items-center gap-3">
            <a
              href="/login"
              className="rounded px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Login
            </a>
            <a
              href="/register"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Sign up
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h1 className="text-5xl font-bold leading-tight">
          Real‑time chat,{" "}
          <span className="text-blue-600">simple and fast.</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Send messages instantly, share files, and stay connected with your
          teams and friends.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="/register"
            className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
          >
            Get started free
          </a>
          <a
            href="/login"
            className="rounded-lg border-2 border-blue-600 px-6 py-3 text-base font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Sign in
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6 transition hover:shadow-lg">
            <div className="mb-3 text-2xl">⚡</div>
            <h3 className="font-semibold">Fast messaging</h3>
            <p className="mt-2 text-sm text-gray-600">
              Low‑latency Socket.IO messages for instant delivery.
            </p>
          </div>
          <div className="rounded-lg border p-6 transition hover:shadow-lg">
            <div className="mb-3 text-2xl">📁</div>
            <h3 className="font-semibold">File sharing</h3>
            <p className="mt-2 text-sm text-gray-600">
              Upload images, videos, and documents securely.
            </p>
          </div>
          <div className="rounded-lg border p-6 transition hover:shadow-lg">
            <div className="mb-3 text-2xl">✨</div>
            <h3 className="font-semibold">Simple UI</h3>
            <p className="mt-2 text-sm text-gray-600">
              Clean, minimal interface focused on conversation.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-gray-500">
          © 2026 ChatApp. All rights reserved.
        </div>
      </footer>
    </main>
  );
}