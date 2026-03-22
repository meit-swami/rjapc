import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [courses, team, contacts, posts, subs] = await Promise.all([
    prisma.course.count(),
    prisma.teamMember.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.blogPost.count(),
    prisma.newsletterSubscriber.count(),
  ]);

  const cards = [
    { label: "पाठ्यक्रम", value: courses, href: "/admin/courses" },
    { label: "टीम सदस्य", value: team, href: "/admin/team" },
    { label: "अपठित संदेश", value: contacts, href: "/admin/contacts" },
    { label: "ब्लॉग पोस्ट", value: posts, href: "/admin/blog" },
    { label: "न्यूज़लेटर", value: subs, href: "/admin/newsletter" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy font-devanagari">डैशबोर्ड</h1>
      <p className="mt-1 text-slate-600 font-devanagari">सामग्री व पंजीकरण सारांश</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-saffron/40"
          >
            <p className="text-sm text-slate-500 font-devanagari">{c.label}</p>
            <p className="mt-2 text-3xl font-bold text-navy">{c.value}</p>
          </Link>
        ))}
      </div>
      <p className="mt-10 text-sm text-slate-500 font-devanagari">
        सार्वजनिक साइट{" "}
        <Link href="/" className="font-semibold text-saffron hover:underline">
          यहाँ देखें
        </Link>
      </p>
    </div>
  );
}
