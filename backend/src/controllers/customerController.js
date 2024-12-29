import { z } from "zod";
import { Customer } from "../models/customer.js";

import { v2 as cloudinary } from "cloudinary";

import multer from "multer";
import bcrypt from "bcryptjs";
import { unlink } from "fs/promises";
const customerSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  address: z.string().optional(), // Address is optional
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
});

const optionalCustomerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email format" }).optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .optional(),
  address: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" })
    .optional(),
  image: z
    .object({
      mimetype: z.string().regex(/^image\/(jpeg|png|gif|webp)$/, {
        message: "Only JPEG, PNG, GIF, or WEBP images are allowed",
      }),
      size: z
        .number()
        .max(5 * 1024 * 1024, { message: "Image size must not exceed 5MB" }),
    })
    .optional(),
});
export async function getCustomerDetails(req, res) {}

export async function createCustomer(req, res) {
  const { name, email, password, address, phoneNumber } = req.body;

  const parsed = customerSchema.safeParse({
    name,
    email,
    password,
    address,
    phoneNumber,
  });

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: parsed.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
  }
  const encryptedPass = await bcrypt.hash(parsed.data.password, 10);
  console.log(encryptedPass);
  parsed.data.password = encryptedPass;
  try {
    const customer = await Customer.create(parsed.data);

    if (customer) {
      return res.status(201).json({
        success: true,
        message: "customer registered successfully",
        customer,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function editCustomerDetails(req, res) {
  try {
    const { name, email, password, address, phoneNumber } = req.body;

    let image = req.files?.image
      ? {
          mimetype: req.files.image.mimetype,
          size: req.files.image.size,
        }
      : undefined;
    const parsed = optionalCustomerSchema.safeParse({
      name,
      email,
      password,
      address,
      phoneNumber,
      image,
    });

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    req.validatedBody = parsed.data;

    const cropParams = {
      width: 300,
      height: 300,
      crop: "crop",
      gravity: "auto",
    };
    console.log(">>>>>>>>>>>");
    const result = await cloudinary.uploader.upload(image.filepath, {
      folder: "profile",
      transformation: cropParams,
    });

    console.log("<<<<<<<<<>>");

    image = result?.url;
    const updatedData = {
      ...parsed.data,
      image,
    };
    const updatedCustomer = await Customer.findOneAndUpdate(
      { email },
      { updatedData },

      { new: true }
    );

    if (updatedCustomer) {
      return res.status(200).json({
        success: false,
        message: "data updated successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
