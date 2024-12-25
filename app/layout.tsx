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
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed inset-0 z-0">
            <BackgroundLines className="w-full h-full opacity-50">
              <div />
            </BackgroundLines>
          </div>
          
          <div className="relative z-10 flex flex-col">
            <Navbar />
            <main className="flex-grow min-h-screen">
              <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-16 sm:py-20 md:py-24">
                  {children}
                </div>
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
