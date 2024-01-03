"use client"
import React from "react"
import recipe1 from "@/public/recipe1.png"
import recipe2 from "@/public/recipe2.png"
import recipe3 from "@/public/recipe3.png"
import Image from "next/image"
import Heading from "../components/heading"
import recipes from "@/public/recipes-page.png"
import { motion } from "framer-motion"

export default function Recipes() {
  return (
    <main>
      <Heading
        image={
          <Image
            src={recipes}
            alt="Barrel Picture"
            quality={95}
            className="w-full object-contain"
          />
        }
        header="Need help creating cocktails?"
        text="Indulge in the art of mixology with our curated cocktail recipes, offering a spectrum of flavors crafted from our finest spirits and showcasing the passion and expertise behind our distillery."
      />
      <motion.div
        className="pb-12 pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="min-h-[35rem] w-full justify-center">
          <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-1/2">
              <div className="flex h-full items-center justify-center">
                <Image src={recipe1} alt={"recipe"} />
              </div>
            </div>
            <div className="md:w-1/2 p-4 md:p-6 lg:p-12 flex flex-col justify-center">
              <h1 className="font-semibold text-4xl pb-4">
                Signature Gin + Tonic
              </h1>
              <div className="flex flex-col pb-4 opacity-80">
                1 oz Award Winning Whispering Dutchman Signature Gin{" "}
                <span>4 oz Tonic</span>
                <span>Lime Juice (Fresh or Juice)</span>
                <span>Ice</span>
                <span>1 Lime Wedge</span>
              </div>
              <h1 className="font-semibold text-4xl pb-4">Recipe</h1>
              <div className="opacity-80">
                Put 3 to 4 cubes of ice into your glass. Pour the Whispering
                Dutchman Signature Gin over ice. Add the tonic, we would
                strongly recommend Original 403 sparkling Hop Water as your
                tonic substitute. Add just a squirt of Lime juice to taste.
                Garnish with a lime wedge. Enjoy.
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-[35rem] w-full justify-center">
          <div className="flex flex-col md:flex-row-reverse h-full">
            <div className="md:w-1/2">
              <div className="flex h-full items-center justify-center">
                <Image src={recipe2} alt={"recipe"} />
              </div>
            </div>
            <div className="md:w-1/2 p-4 md:p-6 lg:p-12 flex flex-col justify-center">
              <h1 className="font-semibold text-4xl pb-4">Peppermint Bliss</h1>
              <div className="flex flex-col pb-4 opacity-80">
                2 oz Whispering Dutchman Distillery Peppermint Vodka{" "}
                <span>1 oz white chocolate liqueur</span>
                <span>1 oz half-and-half (or cream)</span>
                <span>Crushed candy canes for rimming the glass</span>
                <span>Mint sprig for garnish</span>
              </div>
              <h1 className="font-semibold text-4xl pb-4">Recipe</h1>
              <div className="opacity-80">
                Rim a chilled martini glass with crushed candy canes by
                moistening the rim with a bit of water and dipping it into the
                crushed candy canes on a plate. In a shaker, add ice, Whispering
                Dutchman Distillery Peppermint Vodka, white chocolate liqueur,
                and half-and-half. Shake well until the mixture is thoroughly
                chilled. Strain the mixture into the prepared martini glass.
                Garnish with a mint sprig for a festive touch.
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-[35rem] w-full justify-center">
          <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-1/2">
              <div className="flex h-full items-center justify-center">
                <Image src={recipe3} alt={"recipe3"} />
              </div>
            </div>
            <div className="md:w-1/2 p-4 md:p-6 lg:p-12 flex flex-col justify-center">
              <h1 className="font-semibold text-4xl pb-4">
                Canadian Maple Caesar
              </h1>
              <div className="flex flex-col pb-4 opacity-80">
                1.5 oz Whispering Dutchman Distillery Canadian Vodka{" "}
                <span>3 oz Clamato juice</span>
                <span>1/4 oz pure maple syrup</span>
                <span>Celery salt and black pepper for rimming</span>
                <span>Ice cubes</span>
                <span>Celery stalk and bacon strip for garnish</span>
              </div>
              <h1 className="font-semibold text-4xl pb-4">Recipe</h1>
              <div className="opacity-80">
                Rim glass with celery salt and black pepper. Fill glass with
                ice. In a shaker, mix Canadian Vodka, Clamato juice, lime juice,
                and maple syrup. Shake well and strain into the glass over ice.
                Garnish with celery stalk and bacon strip. Enjoy responsibly!
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
