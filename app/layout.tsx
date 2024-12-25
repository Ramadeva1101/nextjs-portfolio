import { type Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BackgroundLines } from "@/components/ui/background-lines";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rama's Portfolio",
  description: "Personal portfolio website of a software engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-transparent`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundLines className="fixed inset-0">
            <div></div>
          </BackgroundLines>
          <div className="relative z-10">
            <Navbar />
            <main className="min-h-screen pt-24 pb-16">
              <div className="container mx-auto px-4">
                {children}
              </div>
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}