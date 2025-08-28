"use client";

import { Locale, useRouter } from "@/navigation";
import { PropsWithChildren, ReactNode } from "react";
import { useSession } from "next-auth/react";

type LocaleLayoutParams = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default function LocaleLayout({
  children,
}: PropsWithChildren<LocaleLayoutParams>) {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated() {
      router.replace(`/sign-in?callbackUrl=${window.location.pathname}`);
    },
  });

  return (
    <body>
      <main>{children}</main>
    </body>
  );
}
