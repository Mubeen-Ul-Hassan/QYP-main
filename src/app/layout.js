// app/layout.js (or RootLayout.js)
// Do NOT add "use client"; since this is a Server Component
import "bootstrap/dist/css/bootstrap.min.css";
import "react-phone-input-2/lib/style.css";
import "../components/assets/main1.css";
import "../components/assets/style.css";
import "./globals.css";

// slick css
import "slick-carousel/slick/slick.css";
// skeleton
import "react-loading-skeleton/dist/skeleton.css";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import ClientWrapper from "@/components/mainLayout/ClientWrapper";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "QYP",
  description: "QYP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ClientWrapper>{children}</ClientWrapper>
        </AntdRegistry>
        <Toaster />
      </body>
    </html>
  );
}
