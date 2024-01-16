import PurchaseGigModal from "@/components/Modals/PurchaseGigModal";
import GallerySlider from "@/components/Sliders/GallerySlider";
import { useAccounts } from "@/context/AccountContext";
import { useGigs } from "@/context/GigContext";
import WebLayout from "@/layouts/WebLayout";
import { ChatBubbleOvalLeftEllipsisIcon, StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ServicePreview() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, createChannel } = useAccounts();
  const { getGigById, gig } = useGigs();
  const router = useRouter();
  const gigData = gig?.data || null;

  const handleSendMessage = async () => {
    await createChannel(`${user.data.firstName}-${gigData.created_by.firstName}`, {
      name: `${user.data.firstName}-${gigData.created_by.firstName}`.toLowerCase(),
      members: [`${user.data._id}`, `${gigData.created_by._id}`],
    });
  };

  useEffect(() => {
    if (router.query.serviceId) {
      getGigById(router.query.serviceId);
    }
  }, [router.query]);

  return (
    <WebLayout>
      <div className="container mx-auto">
        {gigData && (
          <div className="flex gap-4 mt-4">
            <div className="basis-8/12">
              <div>
                <h1 className="text-3xl font-display font-bold mb-4">{gigData.title}</h1>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={gigData.created_by.profile_photo}
                      height={100}
                      width={100}
                      className="w-10 h-10 rounded-full object-cover"
                      alt={gigData.created_by.firstName}
                    />
                    <Link
                      href={`/explore/freelancer/${gigData.created_by._id}`}
                      className="font-medium hover:underline underline-offset-2"
                    >
                      {`${gigData.created_by.firstName} ${gigData.created_by.lastName[0]}.`}
                    </Link>
                  </div>
                  <span className="inline-flex gap-1">
                    <StarIcon className="w-6 h-6 fill-amber-500" />
                    <span className="font-medium">
                      {gigData.created_by.avg_rating.toFixed(1)}
                    </span>
                    <span>{`(${gigData.created_by.reviews.length} reviews)`}</span>
                  </span>
                </div>
              </div>
              <div className="border my-4 rounded-md">
                <GallerySlider slides={gigData.gallery} />
              </div>
              <div className="px-4">
                <div className="my-4">
                  <h4 className="font-medium text-lg">Gig Description</h4>
                  <div
                    className="prose mt-4"
                    dangerouslySetInnerHTML={{ __html: gigData.description }}
                  ></div>
                </div>

                <div className="my-4">
                  <h4 className="font-medium text-lg">Reviews</h4>
                </div>
              </div>
            </div>
            <div className="basis-4/12 border text-lg rounded-md p-4">
              <div className="space-y-4 border-b py-4">
                <div className="flex justify-between items-center font-medium">
                  <dt>Delivery in</dt>
                  <dd>{gigData.delivery_days} Days</dd>
                </div>
                <div className="flex justify-between items-center font-medium ">
                  <dt>Revisions</dt>
                  <dd>{gigData.revisions}</dd>
                </div>
                <div className="flex justify-between items-center font-medium ">
                  <dt>Orders</dt>
                  <dd>{gigData.orders.length}</dd>
                </div>
                {gigData.fast_delivery.enabled && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center font-medium mb-4">
                      <dt>Fast Delivery</dt>
                    </div>
                    <div className="flex justify-between items-center font-medium text-sm">
                      <dt>Will Deliver In</dt>
                      <dd>{gigData.fast_delivery.delivery_days} Day(s)</dd>
                    </div>
                    <div className="flex justify-between items-center font-medium text-sm">
                      <dt>For Extra</dt>
                      <dd>${gigData.fast_delivery.extra_price}</dd>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center font-medium text-xl mb-2">
                  <dt>Price</dt>
                  <dd>${gigData.price}</dd>
                </div>
                {isLoggedIn && user?.data?.user_type === "client" && (
                  <button
                    onClick={() => setIsOpen(true)}
                    className="w-full py-2 rounded-md bg-primary-600 hover:bg-primary-500 font-medium text-white"
                  >
                    Continue
                  </button>
                )}
                {!isLoggedIn && (
                  <button
                    onClick={() => router.replace("/auth/signup")}
                    className="w-full py-2 rounded-md bg-primary-600 hover:bg-primary-500 font-medium text-white"
                  >
                    Continue
                  </button>
                )}
              </div>
              <div className="my-4">
                <h4 className="font-medium">About Seller</h4>
                <div className="flex justify-center text-center mt-8">
                  {gigData.created_by.profile_photo ? (
                    <Image
                      src={gigData.created_by.profile_photo}
                      width={200}
                      height={200}
                      className="w-28 h-28 aspect-square object-cover rounded-full"
                      alt={gigData.created_by.firstName}
                    />
                  ) : (
                    <span className="w-28 h-28 flex justify-center items-center  rounded-full text-4xl text-center text-white font-semibold bg-primary-500">
                      {gigData.created_by.firstName[0]}
                    </span>
                  )}
                </div>
                <h1 className="text-lg font-medium text-center">
                  <Link
                    href={`/explore/freelancer/${gigData.created_by._id}`}
                    className="hover:underline underline-offset-2"
                  >
                    {gigData.created_by.firstName} {gigData.created_by.lastName[0]}.
                  </Link>
                </h1>
                <h1 className="text-lg font-medium text-center text-neutral-500">
                  {gigData.created_by.profile_title}
                </h1>
                <div className="text-center mt-4">
                  {isLoggedIn && user?.data?.user_type !== "freelancer" && (
                    <button
                      type="button"
                      onClick={() => {
                        if (!isLoggedIn) {
                          router.replace("/auth/signup");
                        } else if (isLoggedIn && user?.data?.user_type === "client") {
                          handleSendMessage();
                        }
                      }}
                      className="relative w-full text-center inline-flex justify-center items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 hover:ring-primary-300 hover:bg-primary-50 hover:text-primary-500"
                    >
                      <ChatBubbleOvalLeftEllipsisIcon
                        className="-ml-0.5 mr-1.5 h-5 w-5 inline-block"
                        aria-hidden="true"
                      />
                      <span>{`Message ${gigData.created_by.firstName}`}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {gigData && user?.data && (
          <PurchaseGigModal
            open={isOpen}
            setOpen={setIsOpen}
            gigData={gigData}
            user={user.data}
          />
        )}
      </div>
    </WebLayout>
  );
}
