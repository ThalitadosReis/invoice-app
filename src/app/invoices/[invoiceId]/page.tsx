import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";

import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";

import Invoice from "./Invoice";

export default async function InvoicePage({ params }: { params: { invoiceId: string } }) {
  const { userId } = await auth();

  if (!userId) return;

  const invoiceId = Number.parseInt(params.invoiceId);

  if (Number.isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  const [result] = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, 
      eq(Invoices.customerId, Customers.id)
    )
    .where(
      and(
        eq(Invoices.id, invoiceId),
        eq(Invoices.userId, userId)
      )
    )
    .limit(1);

  if (!result) {
    notFound();
  }

  const invoices = {
    ...result.invoices,
    customer: result.customers,
  };

  return <Invoice invoice={invoices} />;
}
