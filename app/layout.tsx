import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Win HealthTrack",
    description: "Your Personal Health Companion",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
