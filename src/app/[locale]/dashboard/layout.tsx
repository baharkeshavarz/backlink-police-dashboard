import { DEFAULT_SIGNIN_PATH } from "@/constants/routes";
import { languages, Locale } from "@/navigation";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  const session = await getServerSession();
  if (!session) {
    redirect(DEFAULT_SIGNIN_PATH);
  }

  return (
    <html lang={locale} dir={languages[typedLocale].direction}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
