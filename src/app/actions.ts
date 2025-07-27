"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import Stripe from "stripe";

import { Customers, Invoices, Status } from "@/db/schema";
import { db } from "@/db";
import { and, eq, isNull } from "drizzle-orm";

const stripe = new Stripe(String(process.env.STRIPE_API_SECRET));

export async function createAction(formData: FormData) {
  const { userId, orgId } = await auth();

  if (!userId) {
    return;
  }

  const value = Math.floor(
    Number.parseFloat(String(formData.get("value"))) * 100
  );
  const description = formData.get("description") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const [customer] = await db
    .insert(Customers)
    .values({
      name,
      email,
      userId,
      orgId: orgId || null,
    })
    .returning({
      id: Customers.id,
    });

  const results = await db
    .insert(Invoices)
    .values({
      value,
      description,
      userId,
      orgId: orgId || null,
      customerId: customer.id,
      status: "open",
    })
    .returning({
      id: Invoices.id,
    });

  redirect(`/invoices/${results[0].id}`);
}

export async function updateStatusAction(
  formData: FormData,
  opts?: { revalidate?: boolean }
) {
  const { userId, orgId } = await auth();

  if (!userId) {
    return;
  }

  const id = formData.get("id") as string;
  const status = formData.get("status") as Status;

  if (orgId) {
    await db
      .update(Invoices)
      .set({ status })
      .where(
        and(eq(Invoices.id, Number.parseInt(id)), eq(Invoices.orgId, orgId))
      );
  } else {
    await db
      .update(Invoices)
      .set({ status })
      .where(
        and(
          eq(Invoices.id, Number.parseInt(id)),
          eq(Invoices.userId, userId),
          isNull(Invoices.orgId)
        )
      );
  }

  if (opts?.revalidate) {
    revalidatePath(`/invoices/${id}`, "page");
  }
}

export async function deleteInvoiceAction(formData: FormData) {
  const { userId, orgId } = await auth();

  if (!userId) {
    return;
  }

  const id = formData.get("id") as string;

  if (orgId) {
    await db
      .delete(Invoices)
      .where(
        and(eq(Invoices.id, Number.parseInt(id)), eq(Invoices.orgId, orgId))
      );
  } else {
    await db
      .delete(Invoices)
      .where(
        and(
          eq(Invoices.id, Number.parseInt(id)),
          eq(Invoices.userId, userId),
          isNull(Invoices.orgId)
        )
      );
  }

  redirect(`/dashboard`);
}

export async function createPayment(formData: FormData) {
  const headersList = headers();
  const origin = (await headersList).get("origin");
  const id = Number.parseInt(formData.get("id") as string);


  const [result] = await db
    .select({
      status: Invoices.status,
      value: Invoices.value,
    })
    .from(Invoices)
    .where(eq(Invoices.id, id))
    .limit(1);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "eur",
          product: "prod_ShjnNnx6cGhJdI",
          unit_amount: result.value,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${origin}/invoices/${id}/payment?status=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/invoices/${id}/payment?status=canceled&session_id={CHECKOUT_SESSION_ID}`,
  });

  if (!session.url) {
    throw new Error("Invalid Session");
  }

  redirect(session.url);
}
