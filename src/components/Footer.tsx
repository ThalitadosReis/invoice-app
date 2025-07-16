import Container from "@/components/Container";

import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 mb-8">
      <Container className="flex justify-between gap-4 text-xs text-slate-500">
        <p>invoice-app &copy; {new Date().getFullYear()}</p>
        <p>Created with Next.js, Xata, and Clerk</p>
      </Container>
    </footer>
  );
}
