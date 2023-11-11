import { Listbox, Transition } from "@headlessui/react";
import axios from "axios";
import { ErrorMessage, Field } from "formik";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import Datepicker from "react-tailwindcss-datepicker";

export function ProjectPricingForm({
  formikData,
  inEthereum,
  setInEthereum,
  deliveryDate,
  setDeliveryDate,
  selectedPricingType,
  setSelectedPricingType,
  pricingTypes,
}) {
  const { values, errors, touched, submitCount, setFieldValue } = formikData;
  const [apiError, setApiError] = useState("");

  const fetchCurrencyRate = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      setInEthereum(response.data.ethereum.usd);
    } catch (error) {
      setApiError("Can't load currency exchange rates right now. Try again later");
    }
  };

  useEffect(() => {
    fetchCurrencyRate();
  }, []);

  return (
    <>
      <div className="w-11/12 flex justify-between">
        <div className="basis-6/12 space-y-5">
          <div className="inline-block relative">
            <label htmlFor="pricing_type" className="block font-medium mb-2">
              Choose A Pricing Type
            </label>
            <Field name="pricing_type" id="pricing_type">
              {({ field }) => (
                <Listbox
                  {...field}
                  value={selectedPricingType}
                  onChange={(value) => {
                    setFieldValue("pricing_type", value.value);
                    setSelectedPricingType(value);
                  }}
                >
                  {({ open }) => (
                    <>
                      <Listbox.Button
                        className={`w-32 p-2 rounded-md border text-left  focus:ring-2 focus:border-primary-500 ${
                          open ? "border-primary-500 ring-2" : "border-neutral-500"
                        } font-medium placeholder:text-neutral-400 outline-none text-sm capitalize`}
                      >
                        <span className="w-full justify-between flex items-center gap-2">
                          {selectedPricingType.label}
                          <span>
                            {
                              <BsChevronDown
                                className={`stroke-1 transition-transform ${
                                  open ? "rotate-180" : "rotate-0"
                                }`}
                              />
                            }
                          </span>
                        </span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          className={
                            "w-full rounded-md shadow-custom-md shadow-neutral-300 mt-2 absolute bg-white divide-y"
                          }
                        >
                          {pricingTypes.map(({ value, label }, index) => (
                            <Listbox.Option
                              key={index}
                              value={{ value, label }}
                              className={
                                " text-sm cursor-pointer hover:bg-primary-100 p-2 capitalize"
                              }
                            >
                              <span>{label}</span>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </>
                  )}
                </Listbox>
              )}
            </Field>
          </div>
          <div className="w-full">
            <label htmlFor="budget" className="font-medium mb-2 block">
              Project Budget
            </label>

            <Field
              name="budget"
              type="number"
              id="budget"
              min={10}
              max={1000}
              className=" w-32 p-2 border border-neutral-500 rounded-md text-left  focus:ring-2 focus:border-primary-500 font-medium placeholder:text-neutral-400 outline-none text-sm capitalize"
            />
            <span className="ml-2 text-lg font-medium">
              {values.pricing_type === "hourly" ? "$/hr" : "$"}
            </span>
            {errors.budget && touched.budget && submitCount > 0 ? (
              <ErrorMessage
                name="budget"
                component={"p"}
                className="field-error__message"
              />
            ) : (
              <p className="text-sm italic text-neutral-500">
                Enter your budget between $10 to $1000
              </p>
            )}

            <h4 className="font-medium">
              {(inEthereum && parseFloat((values.budget / inEthereum).toFixed(4))) || 0}{" "}
              ETH
            </h4>
          </div>
        </div>
        <div className="basis-6/12">
          <label htmlFor="delivery_date" className="block mb-2 font-medium">
            Set A Delivery Date
          </label>

          <Field name="deadline">
            {({ field }) => (
              <Datepicker
                {...field}
                primaryColor="indigo"
                asSingle={true}
                useRange={false}
                value={deliveryDate}
                minDate={new Date()}
                displayFormat="MM/DD/YYYY"
                inputClassName="w-full p-2 border border-neutral-500 rounded-md focus:ring-2 focus:border-primary-500 bg-white text-neutral-700 placeholder:font-medium outline-none"
                onChange={(date) => {
                  setDeliveryDate(date);
                  setFieldValue("deadline", date.endDate);
                }}
              />
            )}
          </Field>
          {errors.deadline && submitCount > 0 && (
            <ErrorMessage
              name="deadline"
              component={"p"}
              className="field-error__message"
            />
          )}
        </div>
      </div>
    </>
  );
}
