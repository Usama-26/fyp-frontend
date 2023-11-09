import { Listbox, RadioGroup, Transition } from "@headlessui/react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";

import * as Yup from "yup";
import { GoDotFill } from "react-icons/go";
import { TbCircleCheck } from "react-icons/tb";

const projectScopeSchema = Yup.object({
  skills_level: Yup.string()
    .trim()
    .required("Choose a pricing type")
    .default("basic"),
  scope: Yup.string().trim().required("Set project scope").default("small"),
});

const projectScopes = [
  {
    name: "Small",
    value: "small",
    description: "Quick, cost-effective, and simple.",
  },
  {
    name: "Medium",
    value: "medium",
    description: "Balanced time, cost, and complexity.",
  },
  {
    name: "Large",
    value: "large",
    description: "Extensive, resource-intensive.",
  },
];

const skillsLevels = [
  {
    name: "Advanced",
    value: "advanced",
    description: "Extensive expertise and experience in the field.",
  },
  {
    name: "Intermediate",
    value: "intermediate",
    description: "Moderate level of proficiency and experience.",
  },
  {
    name: "Beginner",
    value: "beginner",
    description: "Basic understanding and entry-level skills.",
  },
];

export function ProjectScopeForm() {
  const [selectedScope, setSelectedScope] = useState(projectScopes[0]);
  const [selectedSkillsLevel, setSelectedSkillsLevel] = useState(
    projectScopes[0]
  );

  return (
    <>
      <Formik
        initialValues={{
          scope: "small",
          skills_level: "beginner",
        }}
        validationSchema={projectScopeSchema}
      >
        {({ values, errors, touched, submitCount, setFieldValue }) => {
          return (
            <Form className="w-11/12 space-y-5">
              <div className="">
                <label htmlFor="budget" className="font-medium mb-2 block">
                  Set Project Scope
                </label>

                <RadioGroup
                  value={selectedScope}
                  onChange={(scope) => {
                    setSelectedScope(scope),
                      setFieldValue("scope", scope.value);
                  }}
                >
                  <RadioGroup.Label className="sr-only">
                    Project Scope
                  </RadioGroup.Label>
                  <div className="space-y-2">
                    {projectScopes.map((scope) => (
                      <RadioGroup.Option
                        key={scope.value}
                        value={scope}
                        className={({ active, checked }) =>
                          ` relative flex cursor-pointer rounded-lg px-5 py-4 shadow-custom-md shadow-neutral-300 focus:outline-none ${
                            active
                              ? "ring-2 ring-white/60 ring-offset-2 ring-offset-primary-300"
                              : ""
                          } ${
                            checked
                              ? "bg-primary-700/75 text-white"
                              : "bg-white"
                          }`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                    as="p"
                                    className={`font-medium  ${
                                      checked
                                        ? "text-white"
                                        : "text-neutral-700"
                                    }`}
                                  >
                                    {scope.name}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="p"
                                    className={`text-xs italic  ${
                                      checked
                                        ? "text-primary-100"
                                        : "text-neutral-500"
                                    }`}
                                  >
                                    {scope.description}
                                  </RadioGroup.Description>
                                </div>
                              </div>
                              {checked && (
                                <div className="shrink-0 text-white">
                                  <TbCircleCheck className="h-6 w-6" />
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="">
                <label htmlFor="budget" className="font-medium mb-2 block">
                  Choose Skills Level
                </label>
                <RadioGroup
                  value={selectedSkillsLevel}
                  onChange={(level) => {
                    setSelectedSkillsLevel(level),
                      setFieldValue("scope", level.value);
                  }}
                >
                  <RadioGroup.Label className="sr-only">
                    Choose Skills Level
                  </RadioGroup.Label>
                  <div className="space-y-2">
                    {skillsLevels.map((level) => (
                      <RadioGroup.Option
                        key={level.value}
                        value={level}
                        className={({ active, checked }) =>
                          ` relative flex cursor-pointer rounded-lg px-5 py-4 shadow-custom-md shadow-neutral-300 focus:outline-none ${
                            active
                              ? "ring-2 ring-white/60 ring-offset-2 ring-offset-primary-300"
                              : ""
                          } ${
                            checked
                              ? "bg-primary-700/75 text-white"
                              : "bg-white"
                          }`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                    as="p"
                                    className={`font-medium  ${
                                      checked
                                        ? "text-white"
                                        : "text-neutral-700"
                                    }`}
                                  >
                                    {level.name}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="p"
                                    className={`text-xs italic  ${
                                      checked
                                        ? "text-primary-100"
                                        : "text-neutral-500"
                                    }`}
                                  >
                                    {level.description}
                                  </RadioGroup.Description>
                                </div>
                              </div>
                              {checked && (
                                <div className="shrink-0 text-white">
                                  <TbCircleCheck className="h-6 w-6" />
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
