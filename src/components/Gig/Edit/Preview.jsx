import GallerySlider from "@/components/Sliders/GallerySlider";

export default function GigPreview({ step, gigData }) {
  console.log(gigData);
  return (
    <div className="mt-4 p-4 rounded-md shadow-custom-md shadow-neutral-300 min-h-[24rem]">
      <div className="flex mt-4">
        <div className="basis-8/12">
          <div>
            <h1 className="text-3xl font-display font-bold">{gigData.title}</h1>
            <div className="flex"></div>
          </div>
          <div className="border my-4 rounded-md">
            <GallerySlider slides={gigData.gallery} />
          </div>
        </div>
      </div>
    </div>
  );
}
