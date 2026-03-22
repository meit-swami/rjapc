import { TeamAdmin } from "@/components/admin/TeamAdmin";

export default function AdminTeamPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy font-devanagari">टीम सदस्य</h1>
      <p className="mt-1 text-slate-600 font-devanagari">फ़ोटो URL अपलोड या पेस्ट करें</p>
      <div className="mt-8">
        <TeamAdmin />
      </div>
    </div>
  );
}
