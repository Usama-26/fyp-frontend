import { ClockIcon, StarIcon } from "@heroicons/react/20/solid";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ gig }) {
  console.log(gig);

  const renderSlides = () => {
    return gig.gallery?.map((img) => (
      <SplideSlide key={img.public_id}>
        <Image
          src={img.secure_url}
          width={500}
          height={500}
          alt="Service Image"
          className="w-full h-full object-cover rounded-t-md aspect-video"
        />
      </SplideSlide>
    ));
  };
  return (
    <div className="rounded-md shadow mx-auto space-y-4 hover:bg-neutral-100">
      <div>
        <Splide
          options={{
            type: "loop",
            perPage: 1,
            perMove: 1,
            pagination: false,
          }}
        >
          {renderSlides()}
        </Splide>
      </div>

      <div className="h-14 px-3 ">
        <h1
          title={gig.title}
          className=" font-semibold text-lg line-clamp-2 hover:underline underline-offset-2"
        >
          <Link href={`/explore/service/${gig._id}`}>{gig.title}</Link>
        </h1>
      </div>

      {/* Rating and Delivery Time */}
      <div className="px-3 flex justify-between">
        <span className="inline-flex self-start items-center text-sm font-medium">
          <StarIcon className=" w-5 h-5 fill-amber-500" />
          &nbsp;
          <span>{gig.avg_rating.toFixed(1)} &nbsp;</span>
          <span className="text-neutral-500 font-normal">{`(${gig.reviews.length} Reviews)`}</span>
        </span>
        <span className="inline-flex gap-1">
          <ClockIcon className="inline w-5 h-5 " />
          <span className="text-sm">
            <span className="font-semibold">{gig.delivery_days}</span> Days Delivery
          </span>
        </span>
      </div>
      {/* Seller Info & Price */}
      <div className="flex justify-between p-3 border-t ">
        <div className="flex">
          <Image
            src={gig.created_by.profile_photo}
            width={640}
            height={480}
            alt="Seller Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="px-2">
            <Link href={"#"}>
              <h4 className="font-semibold text-primary-700 hover:underline underline-offset-2">
                {`${gig.created_by.firstName} ${gig.created_by.lastName[0]}.`}
              </h4>
            </Link>
            <h6 className="text-xs font-medium capitalize">{gig.created_by.level}</h6>
          </div>
        </div>
        <div className="font-medium text-end">
          <h5 className="">${gig.price || 0}</h5>
        </div>
      </div>
    </div>
  );
}
