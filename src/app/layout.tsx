import "./globals.css";
import { Open_Sans } from "next/font/google";
import AuthContext from "@/context/AuthContext";
import ReactQueryProvider from "@/util/reactQueryProvider";
import TopLogo from "@/components/TopLogo";

const Sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Command Survival",
    template: "%s | Command Survival",
  },
  description: "AI 생존 텍스트 게임 Command Survival",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={Sans.className}>
      <body className="max-w-screen-xl w-full h-screen overflow-y-auto bg-neutral-500 flex flex-col mx-auto bg-[url('/images/bg_wide_1360-768.png')] bg-fixed bg-no-repeat bg-cover bg-center">
        <ReactQueryProvider>
          <AuthContext>
            <TopLogo />
            <main className="grow overflow-y-auto">{children}</main>
          </AuthContext>
          <div id="portal" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
