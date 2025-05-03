"use client";
import Navbar from "../components/(marketing)/Navbar";
import Footer from "../components/(marketing)/Footer";

const posts = [
  {
    title: "Attention to Detail in UI",
    slug: "attention-to-detail-ui",
    date: "May 3, 2025",
    description:
      "We're all in on clean design and user comfort — now with dark mode.",
    content: (
      <>
        <p>
          From the start, we&apos;ve been focused on building a smooth and
          modern interface that feels good to use. Nothing clunky, nothing
          overwhelming.
        </p>
        <p>
          Our latest update brings full dark mode support, making Binly more
          comfortable to use in any setting. It&apos;s not just about looks —
          it&apos;s about usability.
        </p>
        <p>
          We&apos;re constantly refining the UI so you can focus on what
          matters: managing your stuff, not wrestling with a confusing app.
        </p>
      </>
    ),
  },

  {
    title: "How QR Codes Make Inventory Fast",
    slug: "qr-codes-inventory",
    date: "May 2, 2025",
    description: "Using QR codes to check in/out tools without hassle.",
    content: (
      <>
        <p>
          QR codes are a perfect fit for tool and supply tracking. They&apos;re
          cheap, scannable, and can take you straight to any item page in Binly.
        </p>
        <p>
          You can print labels, stick them on your bins or tools, and start
          tracking movement instantly.
        </p>
      </>
    ),
  },
  {
    title: "Welcome to Binly",
    slug: "welcome-to-binly",
    date: "May 1, 2025",
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
];

export default function BlogPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Navbar />
      <main className="max-w-3xl mx-auto py-20 px-6 text-black dark:text-white">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <ul className="space-y-12">
          {posts.map((post) => (
            <li key={post.slug} id={post.slug}>
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {post.date}
              </p>
              <p className="text-gray-800 dark:text-gray-300 mb-4">
                {post.description}
              </p>
              <article className="prose prose-sky">{post.content}</article>
              <hr className="my-10" />
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
