import { createFileRoute } from "@tanstack/react-router";

// Sitemap redirect route. The actual crawler XML sitemap is served statically from /sitemap.xml (in public/sitemap.xml).
export const Route = createFileRoute("/sitemap.xml")({
  loader: () => {
    if (typeof window !== "undefined") {
      window.location.replace("/sitemap.xml");
    }
    return null;
  },
  component: () => null,
});
