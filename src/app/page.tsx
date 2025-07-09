import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col justify-center min-h-screen text-center gap-4 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold">invoice-app</h1>
      <p className="">
        <Button asChild>
          <Link href="/dashboard">Sign In</Link>
        </Button>
      </p>
    </main>
  );
}
