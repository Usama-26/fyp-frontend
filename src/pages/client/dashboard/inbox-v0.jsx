import ClientDashboardLayout from "@/layouts/ClientDashboardLayout";
import { Transition } from "@headlessui/react";
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
export default function ClientInbox() {
  const [text, setText] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const componentRef = useRef(null);

  const handleEmojiClick = (emoji) => {
    setText((prevText) => prevText + emoji.emoji);
  };
  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const closeEmojiPickerOnEscape = (e) => {
    if (e.key === "Escape" && isEmojiPickerOpen) {
      setIsEmojiPickerOpen(false);
    }
  };

  const handleSendKeyDown = (e) => {
    if (e.key === "Enter") {
      // Click the "Send" button when Enter is pressed in the search field
      document.getElementById("send").click();
    }
  };

  const closeEmojiPickerOnOutsideClick = (e) => {
    if (
      isEmojiPickerOpen &&
      componentRef.current &&
      !componentRef.current.contains(e.target)
    ) {
      setIsEmojiPickerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeEmojiPickerOnEscape);
    document.addEventListener("mousedown", closeEmojiPickerOnOutsideClick);

    return () => {
      document.removeEventListener("keydown", closeEmojiPickerOnEscape);
      document.removeEventListener("mousedown", closeEmojiPickerOnOutsideClick);
    };
  }, [isEmojiPickerOpen]);

  return (
    <ClientDashboardLayout>
      <div className="container mx-auto border rounded-lg">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-2/5 border-r divide-y overflow-y-auto">
            <div className=" py-4 px-2">
              <input type="text" placeholder="Search Chats" className="form-input" />
            </div>
            <div className="flex flex-row py-4 px-2 justify-center items-center ">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Luis1994</div>
                <span className="text-neutral-700">Pick me at 9:00 Am</span>
              </div>
            </div>
            <div className="flex flex-row py-4 px-2 items-center ">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/otT2199XwI8/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Everest Trip 2021</div>
                <span className="text-neutral-700">Hi Sam, Welcome</span>
              </div>
            </div>
          </div>
          <div className="w-full divide-y flex flex-col justify-between">
            <div>
              <div className="flex gap-2 p-4 items-center ">
                <div className="">
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-12 w-12 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-full">
                  <div className="text-lg font-semibold">Javascript Indonesia</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-4  text-sm">
              <div className="flex justify-end mb-4">
                <p className="mr-2 py-2 px-4 bg-primary-500 text-white rounded-lg rounded-br-none max-w-lg">
                  Welcome to group everyone !
                </p>
              </div>
              <div className="flex justify-start mb-4">
                <p className="ml-2 py-2 px-4 text-neutral-700 bg-neutral-200 rounded-lg rounded-bl-none max-w-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat at
                  praesentium, aut ullam delectus odio error sit rem. Architecto nulla
                  doloribus laborum illo rem enim dolor odio saepe, consequatur quas?
                </p>
              </div>
            </div>
            <div className="w-full p-5 flex gap-2">
              <button type="button" className="hover:text-neutral-700 text-neutral-500">
                <PaperClipIcon className="w-6 h-6 inline-block" />
              </button>
              <button
                type="button"
                onClick={toggleEmojiPicker}
                className="relative hover:text-neutral-700 text-neutral-500"
              >
                <FaceSmileIcon className="w-6 h-6 inline-block" />
                <Transition show={isEmojiPickerOpen}>
                  <div className="absolute bg-white z-10 left-1/2 bottom-10">
                    <EmojiPicker
                      autoFocusSearch={false}
                      onEmojiClick={handleEmojiClick}
                    />
                  </div>
                </Transition>
              </button>
              <div className="w-full relative">
                <input
                  className="form-input"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleSendKeyDown}
                  placeholder="Type your message here..."
                />
                <button
                  id="send"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 hover:text-neutral-700 text-neutral-500"
                >
                  <PaperAirplaneIcon className="w-6 h-6 inline-block" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientDashboardLayout>
  );
}
