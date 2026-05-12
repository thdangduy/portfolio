import { Settings } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/lib/auth";

export default async function AdminSettingsLink() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  return (
    <Link
      href="/admin/settings"
      className="fixed left-6 top-6 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:left-20 md:top-10"
      aria-label="Site settings"
      title="Site settings"
    >
      <Settings className="h-4 w-4" />
    </Link>
  );
}
