import React from "react";
import Dropzone from "react-dropzone";
import { BiFile } from "react-icons/bi";
export default function FileDropzone({ files, setFiles }) {
  const clearFile = () => {
    setFiles(null);
  };

  const handleOnDrop = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const thumbs = files?.map((file) => (
    <div
      key={file.name}
      className="group-hover:text-neutral-700 bg-neutral-200 m-2 rounded-md inline-flex items-center p-1  text-xs"
    >
      <BiFile className="w-5 h-5" />
      <p className=" p-2">{file.name}</p>
    </div>
  ));

  return (
    <Dropzone onDrop={handleOnDrop}>
      {({ getRootProps, getInputProps }) => (
        <>
          <div
            {...getRootProps()}
            className="border group border-dashed border-neutral-500 rounded-md cursor-pointer py-5 hover:border-primary-500 hover:text-primary-500 hover:bg-primary-50"
          >
            <input {...getInputProps()} />
            {files.length === 0 ? (
              <p className="text-center font-medium">
                {"Drag your attachments here or select "}
              </p>
            ) : (
              <div>{thumbs}</div>
            )}
          </div>
        </>
      )}
    </Dropzone>
  );
}
