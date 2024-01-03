"use client"
import AdminTextArea from "@/app/components/ui/adminTextArea"
import AuthInput from "@/app/components/ui/authInput"
import { Button } from "@/app/components/ui/button"
import UploadImage from "@/app/components/uploadImage"
import { cn } from "@/lib/utils"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import firebaseApp from "@/lib/firebase"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage"
import axios from "axios"
import { useRouter } from "next/navigation"

export type ImageType = {
  image: File | null
}

export type UploadedImageType = {
  image: string
}

const AddProductForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<ImageType[] | null>(null)
  const [isProductCreated, setIsProductCreated] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      type: "",
      price: "",
      stripe: "",
      inventory: true,
      description: "",
      percentage: "",
      imageurl: ""
    }
  })

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  useEffect(() => {
    setCustomValue("images", images)
  }, [images])

  useEffect(() => {
    if (isProductCreated) {
      reset()
      setImages(null)
      setIsProductCreated(false)
    }
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product Data<<<", data)

    setIsLoading(true)
    let uploadedImages: UploadedImageType[] = []

    if (!data.images || data.images.length === 0) {
      setIsLoading(false)
      return toast.error("Upload an image.")
    }

    const handleImageUploads = async () => {
      toast("Uploading...")
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name
            const storage = getStorage(firebaseApp)
            const storageRef = ref(storage, `products/${fileName}`)
            const uploadTask = uploadBytesResumable(storageRef, item.image)

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  console.log("Upload is " + progress + "% done")
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused")
                      break
                    case "running":
                      console.log("Upload is running")
                      break
                  }
                },
                (error) => {
                  console.log("Error uploading image.")
                  reject(error)
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL
                      })
                      console.log("File available at", downloadURL)
                      resolve()
                    })
                    .catch((error) => {
                      console.log("Error getting downloadURL")
                      reject(error)
                    })
                }
              )
            })
          }
        }
      } catch (error) {
        setIsLoading(false)
        console.log("Error handling image uploads", error)
        return toast.error("Error handling image uploads")
      }
    }
    await handleImageUploads()
    const productData = { ...data, images: uploadedImages, imageurl: uploadedImages[0].image  }

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product created!")
        setIsProductCreated(true)
        router.refresh()
      })
      .catch((error) => {
        toast.error("An error occurred.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (value.image) {
        if (!prev) {
          return [value]
        }
        return prev.map((image) =>
          image.image?.name === value.image?.name ? value : image
        )
      } else {
        return null
      }
    })
  }, [])

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (value.image) {
        if (!prev) {
          return null
        }
        return prev.filter(
          (image) => image.image && image.image.name !== value.image?.name
        )
      } else {
        return null
      }
    })
  }, [])

  const price = watch("price")
  const percentage = watch("percentage")

  useEffect(() => {
    if (price) {
     const priceWithDecimal = parseFloat(price).toFixed(2);
     const priceWithoutDecimal = priceWithDecimal.replace(/\./g, "");
     setValue("stripe", Number(priceWithoutDecimal));
    }
    if (percentage) {
     setValue("percentage", Number(percentage));
    }
   }, [price, percentage]);
   
  return (
    <div className="text-black flex flex-col space-y-4 w-4/6">
      <div className="flex flex-row justify-between space-x-2">
        <div className="relative w-full">
          <AuthInput
            disabled={isLoading}
            placeholder="Product Name"
            label="name"
            required
            register={register}
            errors={errors}
            id="name"
            className={cn({
              "focus-visible:ring-orange-500": true,
              "text-black": true,
              "ring-red-700 ring-2": errors.name
            })}
          />
          {errors.name && (
            <div className="absolute left-3 top-2 pointer-events-none text-red-500">
              Name is required
            </div>
          )}
        </div>
        <div className="relative w-full">
          <AuthInput
            disabled={isLoading}
            placeholder="Alcohol Type"
            label="type"
            required
            register={register}
            errors={errors}
            id="type"
            className={cn({
              "focus-visible:ring-orange-500": true,
              "text-black": true,
              "ring-red-700 ring-2": errors.type
            })}
          />
          {errors.type && (
            <div className="absolute left-3 top-2 pointer-events-none text-red-500">
              Alcohol type is required
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between space-x-2">
        <div className="relative w-full">
          <AuthInput
            disabled={isLoading}
            placeholder="Price (Format: 24.95)"
            label="price"
            required
            register={register}
            errors={errors}
            id="price"
            type="number"
            min={0}
            className={cn({
              "focus-visible:ring-orange-500": true,
              "text-black": true,
              "ring-red-700 ring-2": errors.price
            })}
          />
          {errors.price && (
            <div className="absolute left-3 top-2 pointer-events-none text-red-500">
              Price is required
            </div>
          )}
        </div>
        <div className="relative w-full">
          <AuthInput
            disabled={isLoading}
            placeholder="Alcohol Percentage (0-99)"
            label="percentage"
            required
            register={register}
            errors={errors}
            id="percentage"
            type="number"
            min={0}
            max={99}
            className={cn({
              "focus-visible:ring-orange-500": true,
              "text-black": true,
              "ring-red-700 ring-2": errors.percentage
            })}
          />
          {errors.percentage && (
            <div className="absolute left-3 top-2 pointer-events-none text-red-500">
              Percentage is required
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        <AdminTextArea
          disabled={isLoading}
          placeholder="Describe the product..."
          label="description"
          required
          register={register}
          errors={errors}
          id="description"
          className={cn({
            "focus-visible:ring-orange-500": true,
            "text-black": true,
            "ring-red-700 ring-2": errors.description,
            "h-32": true
          })}
        />
        {errors.description && (
          <div className="absolute left-3 top-2 pointer-events-none text-red-500">
            Description is required
          </div>
        )}
      </div>
      <div className="relative border-2 rounded-md p-2 border-stone-300">
        <UploadImage
          file={file}
          setFile={setFile}
          addImageToState={addImageToState}
          removeImageFromState={removeImageFromState}
          isProductCreated={isProductCreated}
        />
      </div>
      <Button
        onClick={handleSubmit(onSubmit)}
        variant="outline"
        className="hover:text-orange-500 mt-2 hover:ring-orange-500 hover:border-orange-500 ring-2 ring-transparent hover:bg-black bg-black text-stone-50"
      >
        {isLoading ? "Loading..." : "Create Product"}
      </Button>
    </div>
  )
}
export default AddProductForm
