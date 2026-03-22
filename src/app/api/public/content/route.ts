import { NextResponse } from "next/server";
import { getPublicPageData } from "@/lib/public-data";

export async function GET() {
  try {
    const data = await getPublicPageData();
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "सर्वर त्रुटि" }, { status: 500 });
  }
}
