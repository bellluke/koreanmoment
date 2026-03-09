import type { Metadata } from "next";
import { Noto_Serif, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-noto-serif",
  display: "swap",
});

const notoSerifKR = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-serif-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Korean Moment — A Gallery of Korean Poetry",
  description:
    "Experience Korean poetry through visual and auditory art. Featuring Yun Dong-ju, Kim Sowol, Jeong Ji-yong, Yi Yuksa, and more.",
  openGraph: {
    title: "Korean Moment — A Gallery of Korean Poetry",
    description:
      "Experience Korean poetry through visual and auditory art.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${notoSerifKR.variable}`}>
      <body>{children}</body>
    </html>
  );
}
