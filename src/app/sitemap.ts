import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miftahuddin.example";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const PATHS = [
  "",
  "about",
  "education",
  "impact",
  "leadership",
  "news",
  "gallery",
  "contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    entries.push({
      url: `${SITE_URL}${BASE_PATH}/${routing.defaultLocale}/${path}`.replace(/\/$/, "") + "/",
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((locale) => [
            locale,
            `${SITE_URL}${BASE_PATH}/${locale}/${path}`.replace(/\/$/, "") + "/",
          ]),
        ),
      },
    });
  }

  return entries;
}
