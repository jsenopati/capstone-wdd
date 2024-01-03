"use client"

import React from "react"
import { motion } from "framer-motion"
import SubmitBtn from "../components/submit-btn"
import { sendEmail } from "@/action/sendEmail"
import toast from "react-hot-toast"

export default function Contact() {
  return (
    <div className="h-screen flex justify-center items-center">
      <motion.section
        id="contact"
        className="mb-20 sm:mb-28 max-w-[35rem] text-center px-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-medium capitalize mb-8 text-center">
          Contact us
        </h2>
        <p className="-mt-6 text-white/80">
          {
            "Have questions or want to book a tour of the distillery? Additionally, are you interested in joining the barrel club? Contact us at "
          }
          <a className="underline" href="mailto:anson@silverone.dev">
            whisperingdutchman@cool.com
          </a>{" "}
          or through this form.
        </p>
        <form
          className="mt-10 flex flex-col text-black"
          action={async (FormData) => {
            const { data, error } = await sendEmail(FormData)

            if (error) {
              toast.error(error)
              return
            }
            toast.success("Email sent successfully!")
          }}
        >
          <input
            className="h-14 px-4 rounded-lg borderBlack bg-white bg-opacity-80 focus:bg-opacity-100 transition-all outline-none"
            name="senderEmail"
            type="email"
            required
            maxLength={500}
            placeholder="Your Email"
          />
          <textarea
            className="h-52 my-3 rounded-lg borderBlack p-4 bg-white bg-opacity-80 focus:bg-opacity-100 transition-all outline-none"
            name="message"
            placeholder="Your Message"
            required
            maxLength={5000}
          />
          <SubmitBtn />
        </form>
      </motion.section>
    </div>
  )
}
