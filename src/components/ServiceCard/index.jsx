import Image from "next/image";
import Link from "next/link";
import { HiClock, HiStar } from "react-icons/hi";

export default function ServiceCard({ title }) {
  return (
    <div className="rounded-md shadow mx-auto space-y-4 hover:bg-neutral-100">
      {/* Service Image and Title */}

      <div>
        <Image
          src={"/images/services/service-image.jpg"}
          width={1024}
          height={768}
          alt="Service Image"
          className="w-full object-cover rounded-t-md aspect-video"
        />
      </div>

      <div className="h-14 px-3 ">
        <h1
          title={title}
          className=" font-semibold text-lg line-clamp-2 hover:underline underline-offset-2"
        >
          {title}
        </h1>
      </div>

      {/* Rating and Delivery Time */}
      <div className="px-3 flex justify-between">
        <span className="inline-flex self-start items-center text-sm font-medium">
          <HiStar className=" w-5 h-5 fill-amber-500" />
          &nbsp;
          <span>5.0 &nbsp;</span>
          <span className="text-neutral-500 font-normal">{"(24 Reviews)"}</span>
        </span>
        <span className="inline-flex gap-1">
          <HiClock className="inline w-5 h-5 " />
          <span className="text-sm">
            <span className="font-semibold">3</span> Days Delivery
          </span>
        </span>
      </div>
      {/* Seller Info & Price */}
      <div className="flex justify-between p-3 border-t ">
        <div className="flex">
          <Image
            src={"/images/profiles/profile-1.jpg"}
            width={640}
            height={480}
            alt="Seller Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="px-2">
            <Link href={"#"}>
              <h4 className="font-semibold text-primary-700 hover:underline underline-offset-2">
                Jordan K.
              </h4>
            </Link>
            <h6 className="text-xs font-medium">Top Rated</h6>
          </div>
        </div>
        <div className="font-medium text-end">
          <h5 className="">0.015 ETH</h5>
          <h6 className="text-neutral-500 ">$25</h6>
        </div>
      </div>
    </div>
  );
}
