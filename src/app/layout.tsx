import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./client-layout";

// Font definitions remain the same
const SatoshiBlack = localFont({
  src: "./fonts/Satoshi-Black.woff",
  variable: "--font-Satoshi-Black",
});
const SatoshiBold = localFont({
  src: "./fonts/Satoshi-Bold.woff",
  variable: "--font-Satoshi-Bold",
});
const SatoshiLight = localFont({
  src: "./fonts/Satoshi-Light.woff",
  variable: "--font-Satoshi-Light",
});
const SatoshiMedium = localFont({
  src: "./fonts/Satoshi-Medium.woff",
  variable: "--font-Satoshi-Medium",
});
const SatoshiRegular = localFont({
  src: "./fonts/Satoshi-Regular.woff",
  variable: "--font-Satoshi-Regular",
});
const SatoshiVariable = localFont({
  src: "./fonts/Satoshi-Black.woff",
  variable: "--font-Satoshi-Variable",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <title>Network Partner Interface</title>
      </head>
      <body
        className={`${SatoshiBlack.variable} ${SatoshiBold.variable} ${SatoshiLight.variable} ${SatoshiMedium.variable} ${SatoshiRegular.variable} ${SatoshiVariable.variable} antialiased h-full`}
      >
        <ClientLayout>{children}</ClientLayout>
       
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        />
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}