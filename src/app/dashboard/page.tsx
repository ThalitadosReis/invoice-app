import Link from "next/link";
import { db } from "@/db";
import { Invoices } from "@/db/schema";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

export default async function Home() {
  const results = await db.select().from(Invoices);

  return (
    <main className="flex flex-col justify-center gap-4 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <p>
          <Button variant="ghost" className="inline-flex gap-2" asChild>
            <Link href="/invoices/new">
              <CirclePlus className="h4- w-4" />
              Create Invoice
            </Link>
          </Button>
        </p>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] p-4">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result) => {
            return (
              <TableRow key={result.id}>
                <TableCell className="font-medium text-left p-0">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="block p-4 font-semibold"
                  >
                    {new Date(result.createTs).toLocaleDateString("en-GB")}
                  </Link>
                </TableCell>
                <TableCell className="text-left p-0">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="block p-4 font-semibold"
                  >
                    Philip J. Fry
                  </Link>
                </TableCell>
                <TableCell className="text-left p-0">
                  <Link href={`/invoices/${result.id}`} className="block p-4">
                    fry@planetexpress.com
                  </Link>
                </TableCell>
                <TableCell className="text-center p-0">
                  <Link className="block p-4" href={`/invoices/${result.id}`}>
                    <Badge className="rounded-full">{result.status}</Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-right p-0">
                   <Link
                      href={`/invoices/${result.id}`}
                      className="block p-4 font-semibold"
                    >${(result.value / 100).toFixed(2)}</Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
