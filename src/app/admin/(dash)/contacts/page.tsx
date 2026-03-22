import { ContactsAdmin } from "@/components/admin/ContactsAdmin";

export default function AdminContactsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy font-devanagari">संपर्क संदेश</h1>
      <div className="mt-8">
        <ContactsAdmin />
      </div>
    </div>
  );
}
