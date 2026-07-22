import { Footer } from "./Footer";
import { Header } from "./Header";
import { ChatWidget } from "@/components/chat/ChatWidget";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
