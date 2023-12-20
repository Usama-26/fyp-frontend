import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { HiX } from "react-icons/hi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ComboboxMultiple({
  items,
  isDisabled,
  defaultItems,
  setValue,
  isEditing,
  placeholder,
}) {
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState(defaultItems || []);
  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item?.toLowerCase().includes(query.toLowerCase());
        });

  const removeItem = (item) => {
    setSelectedItems((prev) => prev.filter((el) => el !== item));
    setValue(selectedItems.filter((el) => el !== item));
  };

  return (
    <Combobox
      as="div"
      value={selectedItems}
      onChange={(items) => {
        setSelectedItems(items);
        setValue(items);
      }}
      disabled={isDisabled}
      multiple
    >
      <div className={`relative mt-2`}>
        <Combobox.Input
          className="w-full rounded-md form-input bg-white py-1.5 pl-3 pr-10 disabled:text-neutral-500 disabled:border-neutral-300 text-neutral-700 shadow-sm sm:text-sm sm:leading-6 outline-none disabled:placeholder:text-gray-500 placeholder:text-gray-700"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredItems.length > 0 && !isDisabled && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems.map((item, index) => (
              <Combobox.Option
                key={index}
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
      <ul className="mt-2 flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <li
            key={item}
            className={
              "inline-flex items-center gap-1 text-xs rounded-lg bg-primary-500 text-white font-medium py-1.5 px-2"
            }
          >
            <span>{item}</span>
            {isEditing && (
              <button type="button" onClick={() => removeItem(item)}>
                <HiX />
              </button>
            )}
          </li>
        ))}
      </ul>
    </Combobox>
  );
}
