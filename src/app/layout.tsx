import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aqua | Clima en tiempo real | Pronóstico de clima",
  description:
    "Consulta el clima actual y el pronóstico de los próximos días de forma rápida y responsiva.",
  keywords: ["clima", "weather app", "pronóstico", "tiempo"],
  authors: [{ name: "Dylan Magallón" }],
  openGraph: {
    title: "Aqua - Tu clima en tiempo real",
    description: "Consulta el clima actual y el pronóstico fácilmente.",
    siteName: "Aqua",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
