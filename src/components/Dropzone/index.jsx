import Image from "next/image";
import { HiX } from "react-icons/hi";
import { MdImage } from "react-icons/md";
const { useEffect } = require("react");
const { useDropzone } = require("react-dropzone");

export default function Dropzone({ error, files, setFiles }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const clearFile = () => {
    setFiles(null);
  };
  const thumbs = files?.map((file) => (
    <div key={file.name}>
      <div className="w-32">
        <Image
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          width={128}
          height={128}
          className="w-auto h-auto"
          alt={file.name}
        />
        <p className="text-xs text-gray-400 mt-4">{file.name}</p>
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files?.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div
        {...getRootProps({
          className: `dropzone max-w-xs mx-auto text-center border flex justify-center border-dashed p-8 rounded-lg border-gray-400 cursor-pointer ${
            error && "border-red-400"
          }`,
        })}
      >
        <input {...getInputProps()} />

        {files ? (
          thumbs
        ) : (
          <div>
            <MdImage className="w-20 h-20 mx-auto fill-gray-400" />
            <h4>Choose Image</h4>
            <p className="text-xs">Choose an Image or Drag in here...</p>
            <p className="text-xs">Accepted Formats .png, .jpg</p>
            <p className="text-xs">
              Please upload image in landscape orientation. i.e. 16:9
            </p>
          </div>
        )}
      </div>
      {files && (
        <div className="text-center">
          <button
            onClick={clearFile}
            className=" text-center rounded-full p-1 hover:bg-neutral-200"
          >
            <HiX className=" w-8 h-8 fill-neutral-700" />
          </button>
        </div>
      )}
    </section>
  );
}
