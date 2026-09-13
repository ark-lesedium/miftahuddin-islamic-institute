import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Amiri, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "../globals.css";

export const viewport: Viewport = {
  themeColor: "#71613d",
  colorScheme: "light",
};

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-amiri",
  weight: ["400", "700"],
  display: "swap",
});

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-ibm-arabic",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://miftahuddin.example";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const otherLocale = locale === "ar" ? "en" : "ar";

  return {
    // basePath is folded in here (rather than left to Next's own basePath
    // injection) because that injection turned out to be inconsistent: it
    // applies to file-convention icons but not reliably to relative
    // og:image/alternates URLs resolved through metadataBase — see the
    // object-form image fix below, which depends on this being absolute.
    metadataBase: new URL(`${siteUrl}${basePath}`),
    title: {
      default: t("siteName"),
      template: t("titleTemplate"),
    },
    description: t("defaultDescription"),
    keywords: t("keywords"),
    applicationName: t("siteName"),
    authors: [{ name: t("siteName") }],
    creator: t("siteName"),
    publisher: t("siteName"),
    category: "Education",
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        en: "/en/",
        ar: "/ar/",
        "x-default": "/en/",
      },
    },
    openGraph: {
      title: t("siteName"),
      description: t("defaultDescription"),
      siteName: t("siteName"),
      locale: locale === "ar" ? "ar_SA" : "en_ZA",
      alternateLocale: otherLocale === "ar" ? "ar_SA" : "en_ZA",
      type: "website",
      url: `/${locale}/`,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: t("siteName"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteName"),
      description: t("defaultDescription"),
      images: ["/opengraph-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miftahuddin.example";
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const origin = `${SITE_URL}${BASE_PATH}`;

  const meta = messages.meta as { siteName: string; defaultDescription: string };
  const brand = messages.brand as { nameArabic: string };
  const contactDetails = messages.contact as {
    details: { addressLines: string[]; postal: string; email: string };
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "NGO"],
    name: meta.siteName,
    alternateName: brand.nameArabic,
    url: `${origin}/${locale}/`,
    logo: `${origin}/images/brand/logo-mark.png`,
    image: `${origin}/opengraph-image.png`,
    description: meta.defaultDescription,
    foundingDate: "1974",
    email: contactDetails.details.email,
    telephone: "+27-82-815-6786",
    address: {
      "@type": "PostalAddress",
      streetAddress: contactDetails.details.addressLines[0],
      addressLocality: "Kimberley",
      postalCode: "8300",
      addressCountry: "ZA",
    },
    areaServed: ["Northern Cape", "Free State"],
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fraunces.variable} ${inter.variable} ${amiri.variable} ${ibmArabic.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ivory-100 text-ink-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`[style*="opacity"]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-teal-700 focus:px-4 focus:py-2 focus:text-ivory-50"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
