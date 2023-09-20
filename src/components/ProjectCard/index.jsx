import { BsClockHistory } from "react-icons/bs";
import { FaLevelUpAlt, FaRegDotCircle } from "react-icons/fa";
import { TbClockCheck } from "react-icons/tb";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Chip from "../Chip";

export default function ProjectCard() {
  return (
    <div className="p-4">
      <div className="flex">
        <div className="space-y-4">
          <div className="flex">
            <h1 className="text-xl font-semibold text-primary-700 hover:underline underline-offset-2">
              Laravel developer required for the gym website
            </h1>
          </div>
          <div className="grid grid-cols-5 text-sm">
            <div className="inline-flex items-center gap-1">
              <BsClockHistory className="w-5 h-5 fill-neutral-500" />
              <span>
                <span>40 minutes ago</span>
              </span>
            </div>
            <div className="inline-flex items-center gap-1">
              <HiOutlineLocationMarker className="w-5 h-5 stroke-neutral-500" />
              <span>Remote</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <FaLevelUpAlt className="w-5 h-5 fill-neutral-500" />
              <span>Intermediate</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <TbClockCheck className="w-5 h-5 stroke-neutral-500" />
              <span>1 week</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <FaRegDotCircle className="w-5 h-5 fill-neutral-500" />
              <span> 9 Proposals</span>
            </div>
          </div>
          <div>
            <p className="text-sm line-clamp-2">
              We are seeking an experienced Laravel developer to join our team
              and assist in the development and maintenance of our gym website.
              Our website plays a crucial role in connecting with our members,
              showcasing our services, and facilitating online bookings.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip value={"PHP"} />
            <Chip value={"Laravel"} />
            <Chip value={"Backend Developer"} />
            <Chip value={"API"} />
            <Chip value={"React"} />
          </div>
        </div>
      </div>
    </div>
  );
}
