import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useMatches,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import "../styles.css";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingMeetingButton } from "@/components/InstantMeeting";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Syncs each route's `head()` metadata and canonical link cleanly into `document.head`
 * without creating duplicate `<title>`, `<meta>`, or `<link rel="canonical">` tags.
 */
function RouteSeoSync() {
  const matches = useMatches();

  useEffect(() => {
    const activeMatch = [...matches].reverse().find((m) => m.meta?.length || m.links?.length);
    if (!activeMatch) return;

    if (activeMatch.meta) {
      for (const tag of activeMatch.meta) {
        if (!tag) continue;
        if ("title" in tag && typeof tag.title === "string") {
          document.title = tag.title;
        } else if ("name" in tag && typeof tag.name === "string" && "content" in tag) {
          upsertMeta("name", tag.name, String(tag.content ?? ""));
        } else if ("property" in tag && typeof tag.property === "string" && "content" in tag) {
          upsertMeta("property", tag.property, String(tag.content ?? ""));
        }
      }
    }

    if (activeMatch.links) {
      for (const link of activeMatch.links) {
        if (link && "rel" in link && link.rel === "canonical" && "href" in link && link.href) {
          upsertCanonical(String(link.href));
        }
      }
    }
  }, [matches]);

  return null;
}

function NotFoundComponent() {
  useEffect(() => {
    document.title = "404 — Page Not Found | RapidTechLabs";
    upsertMeta("name", "robots", "noindex, nofollow");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient-brand">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-gradient-brand px-4 py-2 text-sm font-medium text-white"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-gradient-brand px-4 py-2 text-sm font-medium text-white"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border px-4 py-2 text-sm font-medium">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <RouteSeoSync />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <FloatingMeetingButton />
      </div>
    </QueryClientProvider>
  );
}
