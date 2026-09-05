/**
 * With `images.unoptimized: true` (required for static export), next/image
 * does not automatically prepend `basePath` to local image URLs the way it
 * does for `next/link` hrefs. `NEXT_PUBLIC_*` env vars are inlined at build
 * time, so this is safe to use in both server and client components.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
