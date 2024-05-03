"use server";

import { NewNewsletterContactSchemaType } from "@/lib/zod/newsletter";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createNewletterContact(formData: NewNewsletterContactSchemaType) {
  try {
    const { data, error } = await resend.contacts.create({
      audienceId: "fabf6361-5c01-4981-ab57-b43fe338cb9c",
      email: formData.email,
      firstName: "",
      unsubscribed: false,
    });

    if (error) {
      throw new Error("");
    }

    return data;
  } catch (error) {}
}
