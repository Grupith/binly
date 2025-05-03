// app/blog/page.tsx
"use client";
import Navbar from "../components/(marketing)/Navbar";
import Footer from "../components/(marketing)/Footer";

const posts = [
  {
    title: "Welcome to Binly",
    slug: "welcome-to-binly",
    date: "May 2, 2025",
    description: "Why we started Binly, and how it helps teams stay organized.",
    content: (
      <>
        <p>
          Binly began as a simple tool to help contractors, homeowners, and
          small teams manage their gear and stop losing track of stuff.
        </p>
        <p>
          We wanted something lightweight — no clunky ERP, no spreadsheet
          nonsense. Just clean, fast inventory management for the real world.
        </p>
      </>
    ),
  },
  {
    title: "How QR Codes Make Inventory Fast",
    slug: "qr-codes-inventory",
    date: "May 3, 2025",
    description: "Using QR codes to check in/out tools without hassle.",
    content: (
      <>
        <p>
          QR codes are a perfect fit for tool and supply tracking. They’re
          cheap, scannable, and can take you straight to any item page in Binly.
        </p>
        <p>
          You can print labels, stick them on your bins or tools, and start
          tracking movement instantly.
        </p>
      </>
    ),
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <ul className="space-y-12">
          {posts.map((post) => (
            <li key={post.slug} id={post.slug}>
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-gray-500 text-sm mb-2">{post.date}</p>
              <p className="text-gray-700 mb-4">{post.description}</p>
              <article className="prose prose-sky">{post.content}</article>
              <hr className="my-10" />
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
