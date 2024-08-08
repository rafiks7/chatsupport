import { Inter } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Customer Support",
  description: "Headstarter Project 3",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <UserProvider>
      <body className={inter.className}>{children}</body>
    </UserProvider>
    </html>
  );
}
