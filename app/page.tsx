import { Header } from "@/components/Header";
import { ComponentExample } from "@/components/component-example";
import { Footer } from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
  return (
    <ScrollArea className="h-screen">
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <ComponentExample />
        </main>
        <Footer />
      </div>
    </ScrollArea>
  );
}