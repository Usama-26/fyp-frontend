import { useServices } from "@/context/ServiceContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import StarRating from "../StarRating";
import * as Yup from "yup";
import { StarIcon } from "@heroicons/react/24/outline";

export default function Review({ project }) {
  const { createReview } = useServices();
  const [clientReview, setClientReview] = useState(null);
  const [freelancerReview, setFreelancerReview] = useState(null);

  useEffect(() => {
    const res1 = project.reviews?.filter((review) => review.from === project.created_by);
    const res2 = project.reviews?.filter(
      (review) => review.from === project.assigned_to._id
    );
    setClientReview(res1[0] || null);
    setFreelancerReview(res2[0] || null);
  }, [project]);

  return (
    <div className="mx-8 my-4 rounded-md shadow-custom-md shadow-neutral-300 p-4">
      {!clientReview && !freelancerReview && (
        <h2 className="font-medium mb-2 text-lg">Leave A Review</h2>
      )}

      {clientReview && (
        <div>
          <h4 className="text-lg font-medium">Your Review</h4>
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                className={`w-8 h-8 ${
                  i < clientReview.rating
                    ? "fill-amber-500 stroke-amber-500"
                    : "stroke-amber-500"
                }`}
              />
            ))}
            <span className="text-2xl text-gray-500 font-medium">
              ({clientReview.rating}.0)
            </span>
          </div>
          <div>
            <blockquote className="italic">{`"${clientReview.comment}"`}</blockquote>
          </div>
        </div>
      )}

      {freelancerReview && clientReview && (
        <div>
          <h4 className="text-lg font-medium mt-8">Freelancer Review</h4>
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                className={`w-8 h-8 ${
                  i < freelancerReview.rating
                    ? "fill-amber-500 stroke-amber-500"
                    : "stroke-amber-500"
                }`}
              />
            ))}
            <span className="text-2xl text-gray-500 font-medium">
              ({freelancerReview.rating}.0)
            </span>
          </div>
          <div>
            <blockquote className="italic">{`"${freelancerReview.comment}"`}</blockquote>
          </div>
        </div>
      )}

      {!clientReview && (
        <Formik
          initialValues={{
            comment: "",
            rating: 0,
          }}
          validationSchema={Yup.object({
            comment: Yup.string().required("Please write a comment."),
            rating: Yup.number().required("Please select a star."),
          })}
          onSubmit={(values) => {
            createReview({
              ...values,
              from: project.created_by,
              to: project.assigned_to._id,
              project: project._id,
              gig: project.gig || undefined,
            });
          }}
        >
          {({ values, errors, touched, submitCount, isValid, setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="rating" className="block  font-semibold mb-4">
                  Select a Rating
                </label>
                <StarRating
                  defaultRating={values.rating}
                  onSetRating={(value) => {
                    setFieldValue("rating", value);
                  }}
                />
                {errors.rating && touched.rating && submitCount > 0 && (
                  <ErrorMessage
                    name="comment"
                    component={"p"}
                    className="field-error__message"
                  />
                )}
              </div>
              <div className="">
                <label htmlFor="comment" className="block  font-semibold mb-4">
                  Comment
                </label>
                <Field
                  as="textarea"
                  rows="5"
                  className={`form-input resize-none ${
                    errors.comment && touched.comment && submitCount > 0 && "field-error"
                  }`}
                  type="comment"
                  name="comment"
                  id="comment"
                  maxLength={2000}
                />
                <div>
                  <span className="text-sm float-right">
                    {values.comment.length}/2000
                  </span>
                  {errors.comment && touched.comment && submitCount > 0 && (
                    <ErrorMessage
                      name="comment"
                      component={"p"}
                      className="field-error__message"
                    />
                  )}
                </div>
              </div>

              <div className=" py-4 text-end border-t">
                <button
                  type="submit"
                  disabled={!isValid}
                  className=" px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-medium items-center"
                >
                  Submit Review
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
