import { Inter } from 'next/font/google'

// Add Inter font with subsets (e.g., Latin) and font display set to swap

import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ['latin'],  // You can add more subsets like 'latin-ext' if needed
  display: 'swap',     // Ensures the font is displayed properly during loading
})

export const metadata = {
  title: "RepuLens",
  description: "AI-powered reputation intelligence for businesses and consumers.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
