import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Sign In | Supersite Citizens",
  description: "Sign in or create your Supersite Citizens account to access your dashboard.",
  path: "/login",
  index: false
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
