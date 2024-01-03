"use server"

import { getErrorMessage, validateString } from "@/lib/util"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (FormData: FormData) => {
  const senderEmail = FormData.get("senderEmail")
  const message = FormData.get("message")

  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email"
    }
    
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message"
    }
  }
  let data
  try {
    data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "ansonoy00@gmail.com",
      subject: "Message from contact form",
      reply_to: senderEmail as string,
      text: message as string
    })
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error)
    }
  }
  return {
    data
  }
}
