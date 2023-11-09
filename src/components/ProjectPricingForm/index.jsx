import { Listbox } from "@headlessui/react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const projectPricingSchema = Yup.object({
  pricing_type: Yup.string().trim().required("Choose a pricing type"),
  budget: Yup.number().required("Please enter your budget"),
});

const pricingTypes = [
  {
    value: "fixed",
    label: "Fixed Budget",
  },
  {
    value: "hourly",
    label: "Hourly Rate",
  },
];
export function ProjectPricingForm() {
  const [inEthereum, setInEthereum] = useState(0);
  const [apiError, setApiError] = useState("");
  const [selectedPricingType, setSelectedPricingType] = useState(
    pricingTypes[0]
  );
  const fetchCurrencyRate = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      setInEthereum(response.data.ethereum.usd);
    } catch (error) {
      setApiError(
        "Can't load currency exchange rates right now. Try again later"
      );
    }
  };

  useEffect(() => {
    fetchCurrencyRate();
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          pricing_type: "fixed",
          budget: null,
        }}
        validationSchema={projectPricingSchema}
      >
        {({ values, errors, touched, submitCount, setFieldValue }) => {
          return (
            <Form className="w-11/12 space-y-4">
              <label htmlFor="pricing_type" className="block font-medium">
                Choose A Pricing Type
              </label>
              <Field name="pricing_type" id="pricing_type">
                {({ field }) => (
                  <Listbox
                    value={selectedPricingType}
                    onChange={(value) => {
                      console.log(value);
                      setFieldValue(value.value);
                      setSelectedPricingType(value);
                    }}
                  >
                    <Listbox.Button className={"form-input capitalize"}>
                      {selectedPricingType.label}
                    </Listbox.Button>
                    <Listbox.Options>
                      {pricingTypes.map(({ value, label }, index) => (
                        <Listbox.Option
                          key={index}
                          value={value}
                          className={"capitalize"}
                        >
                          {label}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                    {JSON.stringify(field)}
                  </Listbox>
                )}
              </Field>
              <span className="float-right">
                {parseFloat((values.budget / inEthereum).toFixed(4))} ETH
              </span>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
