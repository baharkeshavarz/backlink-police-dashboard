import { languages, Locale } from "@/navigation";
import { Session } from "next-auth";
import { Inter } from "next/font/google";
import { PropsWithChildren, ReactNode } from "react";
import PageContainer from "./page";
import Overview from "./overview/page";
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

  // const router = useRouter();
  // useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     router.replace({
  //       pathname: DEFAULT_SIGNIN_PATH,
  //       query: { callbackUrl: window.location.pathname },
  //     });
  //   },
  // });
  return (
    <html lang={locale} dir={languages?.[locale]?.direction}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
