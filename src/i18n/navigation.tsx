import { forwardRef } from "react";
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

const { Link: IntlLink, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

/**
 * Static export (`output: "export"`) has no server to serve the RSC
 * segment-cache payloads Next's default prefetching requests, which turns
 * every on-screen nav link into a 404 in the network tab. Plain navigation
 * works fine without it, so prefetch is off by default here; pass
 * `prefetch` explicitly to opt a specific link back in.
 */
export const Link = forwardRef<HTMLAnchorElement, React.ComponentProps<typeof IntlLink>>(
  function Link({ prefetch = false, ...props }, ref) {
    return <IntlLink ref={ref} prefetch={prefetch} {...props} />;
  },
);

export { redirect, usePathname, useRouter, getPathname };
