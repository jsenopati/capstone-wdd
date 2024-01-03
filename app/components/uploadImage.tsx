import { useCallback, useState } from "react"
import { ImageType } from "../admin/add-products/AddProductForm"
import { useDropzone } from "react-dropzone"
import { Button } from "./ui/button"

interface UploadImageProps {
  file: File | null
  setFile: (file: File | null) => void
  item?: ImageType
  addImageToState: (value: ImageType) => void
  removeImageFromState: (value: ImageType) => void
  isProductCreated: boolean
}

const UploadImage: React.FC<UploadImageProps> = ({
  file,
  setFile,
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated
}) => {
  const handleFileChange = useCallback(
    (value: File) => {
      setFile(value)
      addImageToState({ image: value })
    },
    [addImageToState]
  )

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png"] }
  })

  const handleRemoveImage = useCallback(() => {
    setFile(null)
    removeImageFromState({ image: null })
  }, [removeImageFromState, setFile])

  return (
    <div className="flex flex-col items-center text-stone-50">
      <div className="flex flex-col items-center">
        {file && <p className="text-orange-500">Selected Image: {file.name}</p>}
        {file && (
          <img
            className="w-32"
            src={URL.createObjectURL(file)}
            alt={file.name}
          />
        )}
      </div>
      {file ? (
        <Button
          className="hover:text-orange-500 mt-2 hover:ring-orange-5-00 hover:border-orange-500 ring-2 ring-transparent hover:bg-black bg-black"
          onClick={handleRemoveImage}
        >
          Remove Image
        </Button>
      ) : (
        <div
          {...getRootProps()}
          className="p-2 border-2 border-stone-500 hover:text-orange-500 hover:border-orange-500 border-dashed cursor-pointer flex items-center justify-center rounded-md w-full"
        >
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop your PNG here.</p> : <p>+ Product PNG</p>}
        </div>
      )}
    </div>
  )
}

export default UploadImage
