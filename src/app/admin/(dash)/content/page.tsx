import { ContentAdmin } from "@/components/admin/ContentAdmin";

export default function AdminContentPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy font-devanagari">सामग्री खंड</h1>
      <p className="mt-1 text-slate-600 font-devanagari">hero, about, mission आदि — JSON मान्य रखें</p>
      <div className="mt-8">
        <ContentAdmin />
      </div>
    </div>
  );
}
