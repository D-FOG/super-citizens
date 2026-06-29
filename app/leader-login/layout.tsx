import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Leader Sign In | Supersite Citizens",
  description: "Sign in with an approved Cluster Leader or Cluster Supervisor account to access the leader dashboard.",
  path: "/leader-login",
  index: false
});

export default function LeaderLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
