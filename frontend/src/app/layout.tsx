import { options } from "@/lib/auth";
import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import Provider from "@/lib/session-context";
import Sidebar from "@/components/Sidebar";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "Love Letter <3",
  description: "The superior love letter (jk!!!)",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <Provider session={session}>
        <body className={`${poppins.className} isolate`}>
          <div className="fixed z-10">
            <Sidebar />
          </div>
          <div className="ml-16">{children}</div>
        </body>
      </Provider>
    </html>
  );
}
