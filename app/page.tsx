"use client"

import React, { useState } from "react"
import Image from "next/image"
import landingpage from "@/public/landingpage.png"
import landingpage2 from "@/public/landingpage2.png"
import landingpage3 from "@/public/landingpage3.png"
import story1 from "@/public/story1.png"
import story2 from "@/public/story2.png"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { motion } from "framer-motion"

export default function Home() {
  const images = [
    { src: landingpage, alt: "landingpage" },
    { src: landingpage2, alt: "landingpage" },
    { src: landingpage3, alt: "landingpage" }
    // Add more images as needed
  ]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const handleImageSelect = (index: React.SetStateAction<number>) => {
    setCurrentImageIndex(index)
  }
  return (
    <main>
      <motion.div
        className={`h-screen md:h-auto flex flex-col`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-full">
          <Carousel
            selectedItem={currentImageIndex}
            onChange={setCurrentImageIndex}
            showThumbs={false}
            showStatus={false}
            showIndicators={true}
            infiniteLoop
            autoPlay
            dynamicHeight
            interval={4000}
          >
            {images.map((image, index) => (
              <div key={index}>
                <Image src={image.src} alt={image.alt} className=" h-[37rem]" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className=" bg-stone-950 z-40 h-full">
          <div className="flex items-end mx-4 md:mx-8 mt-20 pb-4">
            <h1 className={`text-4xl`}>WHISPERING DUTCHMAN DISTILLERY</h1>
          </div>
          <hr className="w-[6rem] h-1 bg-white mx-4 md:mx-8" />
        </div>
      </motion.div>
      <div className="bg-stone-950">
        <motion.div
          className="flex flex-col sm:flex-row items-center text-center sm:text-left justify-center min-h-[20rem] bg-stone-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className=" flex justify-center text-5xl pb-4">
            Our Commitment
          </div>
          <hr className="w-[3rem] h-1 bg-white mb-4 mx-4" />
          <div className="sm:w-2/3 flex opacity-80">
            Our Gins and Vodkas are handcrafted from the finest local
            ingredients to achieve a blend of old world and new world flavours.
            Our contemporary Gins are complex enough to please the most
            discerning Gin drinker, while our Vodkas are the perfect match for
            any cocktail. All our Gins and Vodkas are created to stand on their
            own as an incredible taste experience.
          </div>
        </motion.div>
        <div className="pt-8 md:pt-16 ">
          <div className="mx-4 md:mx-8 ">
            <motion.h1
              className={`text-4xl pb-4`}
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
            >
              The Story
            </motion.h1>
            <hr className="w-[6rem] h-1 bg-white" />
          </div>

          <motion.div
            className="min-h-[35rem] w-full justify-center pt-4 "
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2">
                <div className="flex h-full items-center justify-center">
                  <Image src={story1} alt={"recipe"} />
                </div>
              </div>
              <div className="md:w-1/2 p-4 md:p-6 lg:p-12 flex flex-col justify-center bg-black/30">
                <h1 className="font-semibold text-4xl pb-4">Far Sighted</h1>
                <div className="opacity-80">
                  What do spectacles and spirits have in common? Bruce Van
                  Leeuwen. During a successful career in the eyeglasses
                  business, with a Friday afternoon habit of a decent gin and
                  tonic to finish off the work week, Bruce became fascinated by
                  the notion of making his own gin. He set out on a path to
                  learn as much as he could about the craft distillery business.
                  He is quick to credit Sue Ransom at Krang Spirits for sharing
                  her expertise and wise counsel, helping him to navigate the
                  choppy waters of the regulatory process in Alberta. Bruce
                  believes her groundbreaking work to start her own small-batch
                  distillery made his job ultimately easier. Two years later,
                  the toughest obstacle turned out to be how to get his new
                  still into the building. His doorway simply wasn't wide
                  enough. He ended up having to take out the adjoining wall
                  shared with the Half Hitch and bringing it though their much
                  larger doorway, repairing the wall afterward. Where there's a
                  wall, there's a way!
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="min-h-[35rem] w-full justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row-reverse h-full">
              <div className="md:w-1/2">
                <div className="flex h-full items-center justify-center">
                  <Image src={story2} alt={"recipe"} />
                </div>
              </div>
              <div className="md:w-1/2 p-4 md:p-6 lg:p-12 flex flex-col justify-center bg-black/30">
                <h1 className="font-semibold text-4xl pb-4">Award Winners</h1>
                <div className="opacity-80">
                  Head distiller, Mitch Klassen is responsible for the
                  delightful versions of gin and vodka that are the hallmarks of
                  Whispering Dutchman. Just nine months into production and
                  they’ve already been awarded the Judges Selection at the
                  Alberta Beverage Awards, out of 800 entries. Not too shabby
                  for the new kid on the block. Drop in for a tasting of the
                  superior grapefruit-infused gin (my personal favourite) or
                  limited edition blueberry-mint vodka. And if you’re feeling
                  especially daring, take home a bottle of 50 proof Moonshine
                  and find out if it lives up to its name (but avoid driving and
                  the operation of heavy machinery).
                </div>
                <div className="opacity-80 pt-4">Jane Usher</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-black/70 w-full">
          <div className="mx-4 md:mx-8 py-8 md:py-16">
            <motion.h1
              className={`text-4xl pb-4`}
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
            >
              Location
            </motion.h1>
            <hr className="w-[6rem] h-1 bg-white" />
            <motion.div
              className="flex flex-col items-center justify-center w-full h-[30rem] pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <iframe
                className="flex flex-col items-center justify-center w-full h-full rounded-2xl"
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ8Tdr8ZVBcVMRowmzju707Q8&key=AIzaSyBYEeWyX2jqtqpSe1AGEUwal1f8dS00zjw"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
