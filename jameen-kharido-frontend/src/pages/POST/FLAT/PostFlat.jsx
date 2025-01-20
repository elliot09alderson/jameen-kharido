import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const PostFlat = () => {
  const validationSchema = Yup.object({
    agentId: Yup.string().required("Agent ID is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.string().required("Location is required"),
    pincode: Yup.number().typeError("Pincode must be a number"),
    price: Yup.number()
      .required("Price is required")
      .positive("Must be positive"),
    area: Yup.number()
      .required("Area is required")
      .positive("Must be positive"),
    bedrooms: Yup.number()
      .required("Number of bedrooms is required")
      .min(0, "Cannot be negative"),
    bathrooms: Yup.number()
      .required("Number of bathrooms is required")
      .min(0, "Cannot be negative"),
    floor: Yup.number().min(0, "Cannot be negative"),
    totalFloors: Yup.number().min(0, "Cannot be negative"),
    furnished: Yup.string().oneOf(
      ["unfurnished", "furnished", "semifurnished"],
      "Invalid selection"
    ),
    amenities: Yup.array().of(Yup.string()),
    age: Yup.number().min(0, "Cannot be negative"),
    maintenance: Yup.number().min(0, "Cannot be negative"),
  });

  const initialValues = {
    agentId: "",
    title: "",
    description: "",
    location: "",
    pincode: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    floor: "",
    totalFloors: "",
    furnished: "",
    amenities: [],
    age: "",
    maintenance: "",
  };

  const handleSubmit = (values) => {
    console.log("Form data:", values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Add Flat Details
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {/* Agent ID */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Agent ID
              </label>
              <Field
                name="agentId"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="agentId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Field
                name="title"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <Field
                name="location"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <Field
                name="price"
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Bedrooms */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Bedrooms
              </label>
              <Field
                name="bedrooms"
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <ErrorMessage
                name="bedrooms"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default PostFlat;
