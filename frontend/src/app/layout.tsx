import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import { cookies } from "next/headers";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shakti",
  description: "Your modern, fast kiryana store delivery.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get('isLoggedIn')?.value === 'true';
  const isAdmin = cookieStore.get('isAdmin')?.value === 'true';
  const userLoggedIn = isLoggedIn || isAdmin;

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${jakarta.variable} antialiased min-h-screen bg-shakti-cream flex flex-col`}
      >
        <LayoutWrapper isLoggedIn={userLoggedIn}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
