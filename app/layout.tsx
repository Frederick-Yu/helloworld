import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "미디어 아카이브",
  description: "YouTube 학습 영상 관리 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}