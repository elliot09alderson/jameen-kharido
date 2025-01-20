import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const PostHome = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [remove, setRemove] = useState(null);
  useEffect(() => {
    setUploadedImages(
      uploadedImages.filter((item, idx) => {
        console.log(idx != remove);
        return idx != remove;
      })
    );
  }, [remove]);
  const formik = useFormik({
    initialValues: {
      agentId: "",
      title: "",
      description: "",
      pincode: "",
      location: "",
      price: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      parking: false,
      garden: false,
      amenities: [],
      nearby: [],
      images: [],
    },
    validationSchema: Yup.object({
      agentId: Yup.string().required("Agent ID is required"),
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      location: Yup.string().required("Location is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      area: Yup.number()
        .required("Area is required")
        .positive("Area must be positive"),
      bedrooms: Yup.number()
        .required("Bedrooms are required")
        .min(1, "Must have at least 1 bedroom"),
      bathrooms: Yup.number()
        .required("Bathrooms are required")
        .min(1, "Must have at least 1 bathroom"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      // Handle form submission, e.g., sending the data to the server
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prevImages) => [...prevImages, ...imageUrls]);
    formik.setFieldValue("images", [...formik.values.images, ...files]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add Home Advertisement</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          {/* Agent ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="agentId">
              Agent ID
            </label>
            <input
              id="agentId"
              name="agentId"
              type="text"
              className="w-full p-2 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.agentId}
            />
            {formik.touched.agentId && formik.errors.agentId ? (
              <div className="text-red-500 text-sm">
                {formik.errors.agentId}
              </div>
            ) : null}
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="w-full p-2 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-sm">{formik.errors.title}</div>
            ) : null}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            ) : null}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              className="w-full p-2 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500 text-sm">{formik.errors.price}</div>
            ) : null}
          </div>

          {/* Area */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="area">
              Area (sq ft)
            </label>
            <input
              id="area"
              name="area"
              type="number"
              className="w-full p-2 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.area}
            />
            {formik.touched.area && formik.errors.area ? (
              <div className="text-red-500 text-sm">{formik.errors.area}</div>
            ) : null}
          </div>

          {/* Bedrooms */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="bedrooms"
            >
              Bedrooms
            </label>
            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              className="w-full p-2 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bedrooms}
            />
            {formik.touched.bedrooms && formik.errors.bedrooms ? (
              <div className="text-red-500 text-sm">
                {formik.errors.bedrooms}
              </div>
            ) : null}
          </div>

          {/* Bathrooms */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="bathrooms"
            >
              Bathrooms
            </label>
            <input
              id="bathrooms"
              name="bathrooms"
              type="number"
              className="w-full p-2 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bathrooms}
            />
            {formik.touched.bathrooms && formik.errors.bathrooms ? (
              <div className="text-red-500 text-sm">
                {formik.errors.bathrooms}
              </div>
            ) : null}
          </div>
        </div>
        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Upload Images
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            className="w-full p-2 border rounded"
            onChange={handleImageChange}
          />
        </div>

        {/* Display Uploaded Images */}
        {uploadedImages.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Uploaded Images</h3>
            <div className="grid grid-cols-3 gap-4 ">
              {uploadedImages.map((img, idx) => (
                <div
                  key={idx}
                  className="flex justify-center relative cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`image-${idx}`}
                    className="w-30 h-30 object-cover rounded "
                  />
                  <p
                    className=" bg-red-500 rounded-full p-1 px-3 absolute top-1 right-1 text-xl z-10 text-white"
                    onClick={() => {
                      setRemove(idx);
                    }}
                  >
                    x
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostHome;
