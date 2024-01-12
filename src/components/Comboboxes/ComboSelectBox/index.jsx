import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { classNames } from "@/utils/generics";


export default function ComboSelectBox({ items, isDisabled, defaultItem, setValue, placeholder }) {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(defaultItem || null);

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selectedItem}
      onChange={(item) => {
        setSelectedItem(item);
        setValue(item);
      }}
      disabled={isDisabled}
    >
      {/* <Combobox.Label className="block text-sm font-medium leading-6 text-neutral-700">
        Assigned to
      </Combobox.Label> */}
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md form-input bg-white py-1.5 pl-3 pr-10 disabled:text-neutral-500 disabled:border-neutral-300 text-neutral-700 shadow-sm sm:text-sm sm:leading-6 outline-none"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(item) => item}
          placeholder={placeholder || 'Select Item'}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredItems.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems.map((item) => (
              <Combobox.Option
                key={item}
                value={item}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-8 pr-4",
                    active ? "bg-primary-500 text-white" : "text-neutral-700"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {item}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 left-0 flex items-center pl-1.5",
                          active ? "text-white" : "text-primary-500"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
