import localFont from "next/font/local";
import BottomAppBar from "../components/BottomAppBar";
import TopBar from "../components/TopBar";
import { AuthProvider } from "./AuthProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Bulieve",
  description: "Bulieve - Stock Community Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <TopBar />
          <main className="flex-grow pt-16 pb-20">{children}</main>
          <BottomAppBar />
        </AuthProvider>
      </body>
    </html>
  );
}
