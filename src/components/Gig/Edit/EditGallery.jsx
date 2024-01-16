import { useGigs } from "@/context/GigContext";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import FileDropzone from "@/components/FIleDropzone";
import { useState } from "react";
import Image from "next/image";

export default function EditGallery({ step, gigData }) {
  const { updateGigGallery, isLoading } = useGigs();
  const [errorMessage, setErrorMessage] = useState("");
  const [gallery, setGallery] = useState([]);
  const router = useRouter();

  const handleUpdate = () => {
    if (gigData.gallery.length === 0 && gallery.length === 0) {
      setErrorMessage("Select some images.");
      return;
    } else if (gigData.gallery.length === 0 && gallery.length > 0) {
      step.status = "complete";
      updateGigGallery(gigData._id, { gallery: gallery });
    } else {
      step.status = "complete";
      router.replace(`${gigData._id}?step=04`);
    }
  };

  return (
    <div className="mt-4 p-4 rounded-md shadow-custom-md shadow-neutral-300 min-h-[24rem]">
      <div className="grid grid-cols-3">
        <div>STEP 3: GALLERY</div>
        <div className="col-span-2 max-w-xl">
          <div>
            <FileDropzone
              acceptableFiles={{
                "image/jpeg": [],
                "image/png": [],
              }}
              files={gallery}
              setFiles={setGallery}
            />
          </div>
          {gallery.length === 0 && errorMessage && (
            <p className="field-error__message">{errorMessage}</p>
          )}
          {gallery.length > 0 && (
            <div className="flex flex-wrap gap-4 p-2 border rounded-md my-4">
              {gallery.map((img) => (
                <Image
                  key={img.name}
                  src={img.preview}
                  width={200}
                  height={250}
                  alt={img.name}
                  className="w-40 h-40 object-contain rounded-md"
                />
              ))}
            </div>
          )}

          {gigData.gallery?.length > 0 && (
            <div className="flex flex-wrap gap-4 p-2 border rounded-md my-4">
              {gigData.gallery?.map((img) => (
                <Image
                  key={img.filename}
                  src={img.secure_url}
                  width={img.width}
                  height={img.height}
                  alt={img.filename}
                  className="w-40 h-40 object-contain rounded-md"
                />
              ))}
            </div>
          )}

          <div className="space-x-2 text-end mt-4">
            <button
              onClick={() => {
                router.replace(`${gigData._id}?step=02`);
              }}
              className="font-medium px-2 py-1.5 rounded bg-neutral-200 hover:bg-neutral-300  text-sm"
            >
              Back
            </button>
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              className="bg-primary-500 font-medium px-2 py-1.5 text-sm rounded-md hover:bg-primary-700 text-white disabled:bg-neutral-100 disabled:text-neutral-500 "
            >
              {isLoading ? <Spinner /> : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
