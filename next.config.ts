import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// For a GitHub Pages *project* site (https://<user>.github.io/<repo>/), set
// NEXT_PUBLIC_BASE_PATH="/<repo>" as a build-time env var (see .github/workflows/deploy.yml).
// Leave it empty for a custom domain or a user/organization root site.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
