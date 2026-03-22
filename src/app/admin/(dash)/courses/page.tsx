import { CoursesAdmin } from "@/components/admin/CoursesAdmin";

export default function AdminCoursesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy font-devanagari">पाठ्यक्रम</h1>
      <p className="mt-1 text-slate-600 font-devanagari">जोड़ें, संपादित करें या हटाएँ</p>
      <div className="mt-8">
        <CoursesAdmin />
      </div>
    </div>
  );
}
