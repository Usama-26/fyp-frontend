import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useGigs } from "@/context/GigContext";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import { Switch } from "@headlessui/react";
import { useState } from "react";

export default function EditPricing({ step, gigData }) {
  const { updateGigPricing, isLoading, gig, error } = useGigs();

  const router = useRouter();

  const pricingSchema = Yup.object({
    delivery_days: Yup.number().min(1).max(90).required("Enter Delivery Days"),
    revisions: Yup.number().min(1).max(10).required("Enter Revisions"),
    fast_delivery: Yup.object({
      enabled: Yup.boolean(),
      delivery_days: Yup.number().min(1).max(45),
      extra_price: Yup.number().min(10).max(100),
    }),
    price: Yup.number().required("Enter a Price") || 10,
  });

  return (
    <div className="mt-4 p-4 rounded-md shadow-custom-md shadow-neutral-300 min-h-[24rem]">
      <div className="grid grid-cols-3">
        <div>STEP 2: PRICING</div>
        <div className="col-span-2 max-w-lg">
          <Formik
            initialValues={{
              delivery_days: gigData.delivery_days || 1,
              revisions: gigData.revisions || 1,
              fast_delivery: {
                enabled: gigData.fast_delivery?.enabled || false,
                delivery_days: gigData.fast_delivery?.delivery_days || 1,
                extra_price: gigData.fast_delivery?.extra_price || 10,
              },
              price: gigData.price || 10,
            }}
            validationSchema={pricingSchema}
            onSubmit={(values) => {
              step.status = "complete";
              updateGigPricing(values, gigData._id);
            }}
          >
            {({ values, errors, touched, submitCount, setFieldValue }) => (
              <Form className="space-y-4 py-4">
                <div className="py-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Delivery Days</h4>
                    <Field
                      name="delivery_days"
                      id="delivery_days"
                      type="number"
                      min={1}
                      max={90}
                      className=" w-28 py-1.5 px-4 border border-neutral-500 rounded-md text-left  focus:ring-2 focus:border-primary-500 font-medium placeholder:text-neutral-400 outline-none  capitalize"
                    />
                  </div>
                  {errors.delivery_days && touched.delivery_days && submitCount > 0 && (
                    <ErrorMessage
                      name="delivery_days"
                      component={"p"}
                      className="field-error__message"
                    />
                  )}
                </div>
                <div className="py-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">No. of Revisions</h4>
                    <Field
                      name="revisions"
                      id="revisions"
                      type="number"
                      min={1}
                      max={10}
                      className=" w-28 py-1.5 px-4 border border-neutral-500 rounded-md text-left  focus:ring-2 focus:border-primary-500 font-medium placeholder:text-neutral-400 outline-none  capitalize"
                    />
                  </div>
                  {errors.revisions && touched.revisions && submitCount > 0 && (
                    <ErrorMessage
                      name="revisions"
                      component={"p"}
                      className="field-error__message"
                    />
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Fast Delivery</h4>
                  <Switch
                    checked={values.fast_delivery.enabled}
                    onChange={() => {
                      setFieldValue(
                        "fast_delivery.enabled",
                        !values.fast_delivery?.enabled
                      );
                    }}
                    className={`${
                      values.fast_delivery?.enabled ? "bg-primary-600" : "bg-neutral-300"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        values.fast_delivery?.enabled ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>
                {values.fast_delivery.enabled && (
                  <div className="flex justify-between items-center">
                    <div className="py-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium mr-2">Deliver in</h4>
                        <Field
                          name="fast_delivery.delivery_days"
                          id="fast_delivery.delivery_days"
                          type="number"
                          min={1}
                          max={90}
                          className="w-28 py-1.5 px-4 border border-neutral-500 rounded-md text-left  focus:ring-2 focus:border-primary-500 font-medium placeholder:text-neutral-400 outline-none  capitalize"
                        />
                        <h4 className="font-medium ml-2">Days</h4>
                      </div>
                      {errors.fast_delivery?.delivery_days &&
                        touched.fast_delivery?.delivery_days &&
                        submitCount > 0 && (
                          <ErrorMessage
                            name="fast_delivery.delivery_days"
                            component={"p"}
                            className="field-error__message"
                          />
                        )}
                    </div>
                    <div className="py-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium mr-2">For an extra $</h4>
                        <Field
                          name="fast_delivery.extra_price"
                          id="fast_delivery.extra_price"
                          type="number"
                          min={10}
                          max={100}
                          className="w-28 py-1.5 px-4 border border-neutral-500 rounded-md text-left  focus:ring-2 focus:border-primary-500 font-medium placeholder:text-neutral-400 outline-none  capitalize"
                        />
                        {errors.fast_delivery?.extra_price &&
                          touched.fast_delivery?.extra_price &&
                          submitCount > 0 && (
                            <ErrorMessage
                              name="fast_delivery.extra_price"
                              component={"p"}
                              className="field-error__message"
                            />
                          )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="py-2">
                  <div className="flex justify-between items-center text-xl font-medium">
                    <h4 className=" ">Price</h4>
                    <div>
                      <span className="mr-2">$</span>
                      <Field
                        name="price"
                        id="price"
                        type="number"
                        min={10}
                        max={1000}
                        className=" w-28 py-2 px-4 border border-neutral-500 rounded-md text-left  focus:ring-2 focus:border-primary-500 font-medium placeholder:text-neutral-400 outline-none  capitalize"
                      />
                    </div>
                  </div>
                  {errors.price && touched.price && submitCount > 0 && (
                    <ErrorMessage
                      name="price"
                      component={"p"}
                      className="field-error__message"
                    />
                  )}
                </div>

                <div className="space-x-2 text-end pt-4">
                  <button
                  type="button"
                    onClick={() => {
                      router.replace(`${gigData._id}?step=01`);
                    }}
                    className="font-medium px-2 py-1.5 rounded bg-neutral-200 hover:bg-neutral-300 text-sm  "
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary-500 font-medium px-2 py-1.5 text-sm rounded-md hover:bg-primary-700 text-white disabled:bg-neutral-100 disabled:text-neutral-500 "
                  >
                    {isLoading ? <Spinner /> : "Update"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
