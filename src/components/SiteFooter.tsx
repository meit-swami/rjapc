import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-devanagari text-lg font-bold text-navy">राष्ट्रीय जनादेश प्रमोशनल काउंसिल</p>
          <p className="mt-1 text-sm text-slate-600 font-devanagari">राजनीतिक शिक्षा का उच्च शिक्षण संस्थान</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <Link href="/blog" className="hover:text-saffron font-devanagari">
            ब्लॉग
          </Link>
          <Link href="/admin/login" className="hover:text-saffron">
            प्रशासन
          </Link>
        </div>
      </div>
      <div className="border-t border-slate-100 bg-slate-50 py-4 text-center text-xs text-slate-500 font-devanagari">
        © {new Date().getFullYear()} राष्ट्रीय जनादेश प्रमोशनल काउंसिल. सर्वाधिकार सुरक्षित.
      </div>
    </footer>
  );
}
