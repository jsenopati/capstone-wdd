import Image from "next/image"
import prisma from "@/lib/prisma"
import distillery from "@/public/product-page.png"
import Heading from "../../components/heading"
import Products from "../../components/products-card"
import { redirect } from "next/navigation"
import Link from "next/link"

type SearchPageProps = {
  searchParams: { query: string }
}

async function searchProducts(formData: FormData) {
  "use server"

  const searchQuery = formData.get("searchQuery")?.toString()
  if (searchQuery) {
    redirect("/shop/search?query=" + searchQuery)
  } else {
    redirect("/shop")
  }
}

export default async function SearchPage({
  searchParams: { query }
}: SearchPageProps) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { type: { contains: query, mode: "insensitive" } }
      ]
    }
  })

  return (
    <main>
      <Heading
        image={
          <Image
            src={distillery}
            alt="Barrel Picture"
            quality={95}
            className="w-full object-contain"
          />
        }
        header="Shop"
        text="Explore our exclusive shop page, where you can elevate your collection with the crisp allure of our signature vodka and the botanical symphony of our artisanal gin; each bottle is a celebration of quality and flavor, embodying the essence of extraordinary craftsmanship."
      />
      <div className="flex gap-2 px-2 sm:px-4 lg:px-8">
        <form action={searchProducts}>
          <input
            name="searchQuery"
            placeholder="Search"
            className="bg-gray-700 rounded-xl px-2"
          />
        </form>
        <Link href={"/shop"}>clear</Link>
      </div>

      <div className="w-full flex justify-center py-8 px-2 sm:px-4 lg:px-8">
        <Products product={products} />
      </div>
    </main>
  )
}
