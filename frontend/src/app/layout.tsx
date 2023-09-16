import { options } from "@/lib/auth";
import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import Provider from "@/lib/session-context";

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
      <body className={poppins.className}>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
