import { DEFAULT_SIGNIN_PATH } from "@/constants/routes";
import { languages, Locale } from "@/navigation";
import { getServerSession, Session } from "next-auth";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { PropsWithChildren, ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

type LocaleLayoutParams = {
  children: ReactNode;
  params: Promise<{ locale: Locale; session: Session | null }>;
};

export default async function LocaleLayout({
  children,
  params,
}: PropsWithChildren<LocaleLayoutParams>) {
  const { locale } = await params;

  const session = await getServerSession();
  if (!session) {
    redirect(DEFAULT_SIGNIN_PATH);
  }

  return (
    <html lang={locale} dir={languages?.[locale]?.direction}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
