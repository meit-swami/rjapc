/** Build tel: href from a display line like "संस्थापक: 8302141401" or "कार्यालय: 0141-3286277". */
export function phoneLineToTelHref(line: string): string {
  const digits = line.replace(/\D/g, "");
  if (digits.length === 10) return `tel:+91${digits}`;
  if (digits.length >= 11 && digits.startsWith("0")) return `tel:+91${digits.slice(1)}`;
  if (digits.length >= 12 && digits.startsWith("91")) return `tel:+${digits}`;
  if (digits.length > 0) return `tel:+${digits}`;
  return "tel:";
}
