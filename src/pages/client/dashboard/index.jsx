import Spinner from "@/components/Spinner";
import { useAccounts } from "@/context/AccountContext";
import ClientDashboardLayout from "@/layouts/ClientDashboardLayout";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";

const stats = [
  { name: "Projects Posted", stat: "0" },
  { name: "Total Payments", stat: "$ 0" },
  { name: "Job Success Rate", stat: "0 %" },
];

export default function ClientOverview() {
  return (
    <ClientDashboardLayout>
      <div className="flex gap-2">
        <div className="basis-9/12 border rounded-md">
          {/* Stats Section */}
          <div className="px-5">
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.name}
                  className="overflow-hidden rounded-md bg-white px-4 py-5 shadow-custom-md shadow-neutral-300 sm:p-6"
                >
                  <dt className="truncate text-sm font-medium text-gray-500">
                    {item.name}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    {item.stat}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <UserInfo />
      </div>
    </ClientDashboardLayout>
  );
}

function UserInfo({}) {
  const { user, isLoading } = useAccounts();

  return (
    <div className="basis-3/12 rounded-md border">
      {isLoading && (
        <div className="h-full flex items-center justify-center">
          <Spinner />
          <span className="text-sm">Loading...</span>
        </div>
      )}

      {user && (
        <>
          <div className="p-4 border-b">
            <div className="flex justify-center text-center mt-8">
              {user.data.profile_photo ? (
                <Image
                  src={user.data.profile_photo}
                  width={1024}
                  height={683}
                  className="w-20 h-20 aspect-square object-cover rounded-full"
                  alt="Profile Picture"
                />
              ) : (
                <span className="w-20 h-20 flex justify-center items-center  rounded-full text-4xl text-center text-white font-semibold bg-primary-500">
                  {user.data.firstName[0]}
                </span>
              )}
            </div>
            <h1 className="text-lg font-medium text-center">
              {user.data.firstName} {user.data.lastName[0]}.
            </h1>
            <p className="text-center text-sm text-neutral-500">
              {user.data.profile_title || ""}
            </p>
            <p className="text-center text-sm">{user.data.country}</p>
          </div>
          {/* <div className="p-4 border-b">
            <div className="flex justify-between text-sm">
              <span>Payment Status</span>
              {user.data.payment_method ? (
                <span className="font-medium inline-flex items-center">
                  <span>
                    <CheckCircleIcon className="inline mr-2 w-4 h-4 fill-success-600" />
                  </span>
                  <span>Verified</span>
                </span>
              ) : (
                <span className="font-medium inline-flex items-center">
                  <span>
                    <XCircleIcon className="inline mr-2 w-5 h-5 fill-danger-600" />
                  </span>
                  <span>Not Verified</span>
                </span>
              )}
            </div>
          </div> */}
          <div className="p-4 border-b">
            <div className="flex justify-between items-center text-sm">
              <span>Reviews</span>
              <span>
                <span>
                  {Array.from({ length: 5 }, (_, i) => (
                    <AiFillStar key={i} className="inline fill-amber-400 w-4 h-4" />
                  ))}
                </span>
                <span className="text-neutral-500 ml-1 font-medium">{`(0.0)`}</span>
              </span>
            </div>
          </div>
          <div className="p-4 border-b">
            <div className="flex justify-between items-center text-sm">
              <span>Total Spent</span>
              <span>
                <span className="text-neutral-500 ml-1 font-medium">$ 0</span>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
