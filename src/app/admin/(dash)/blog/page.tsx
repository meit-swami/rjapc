import { BlogAdmin } from "@/components/admin/BlogAdmin";

export default function AdminBlogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy font-devanagari">ब्लॉग</h1>
      <div className="mt-8">
        <BlogAdmin />
      </div>
    </div>
  );
}
