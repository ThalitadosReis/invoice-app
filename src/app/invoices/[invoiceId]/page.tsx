import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";

import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull  } from "drizzle-orm";
import { notFound } from "next/navigation";

import Invoice from "./Invoice";

export default async function InvoicePage({ params }: { params: { invoiceId: string } }) {
  const resolvedParams = await params;
  const { userId, orgId } = await auth();

  if (!userId) return;

  const invoiceId = Number.parseInt(resolvedParams.invoiceId);

  if (Number.isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  let result;
  if (orgId) {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(eq(Invoices.id, invoiceId), eq(Invoices.orgId, orgId)),
      )
      .limit(1);
  } else {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.userId, userId),
          isNull(Invoices.orgId),
        ),
      )
      .limit(1);
  }

  if (!result) {
    notFound();
  }

  const invoices = {
    ...result.invoices,
    customer: result.customers,
  };

  return <Invoice invoice={invoices} />;
}
