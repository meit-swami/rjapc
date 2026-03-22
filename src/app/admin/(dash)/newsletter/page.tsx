import { NewsletterAdmin } from "@/components/admin/NewsletterAdmin";

export default function AdminNewsletterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy font-devanagari">न्यूज़लेटर सदस्य</h1>
      <div className="mt-8">
        <NewsletterAdmin />
      </div>
    </div>
  );
}
