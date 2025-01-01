import { Customer } from "../models/customer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const customerLoginSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
});
const customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const parsed = customerLoginSchema.safeParse({
      email,
      password,
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
    const isPresent = await Customer.findOne({
      email: parsed.data.email,
    }).select("+password");
    if (!isPresent) {
      return res.status(400).json({ error: "not present" });
    }
    const matched = await bcrypt.compare(parsed.data.password, password);

    if (matched) {
      const expiryDuration = 24 * 60 * 60 * 1000; // 1 day in milliseconds
      const token = await jwt.sign(
        {
          email: isPresent.email,
          _id: isPresent._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" } // Set token expiration
      );

      isPresent.token = token; // Assuming the Customer model has a `token` field
      isPresent.tokenExpiry = new Date(Date.now() + expiryDuration);
      await isPresent.save();

      return res
        .status(200)
        .cookie("customerToken", token, { httpOnly: true, secure: true })
        .json({
          message: "logged in successfully",
          token,
        });
    }
  } catch (error) {
    console.error("Error during customer login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const customerLogout = async (req, res) => {
  try {
    const { email, password } = req.body;

    const parsed = customerLoginSchema.safeParse({
      email,
      password,
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
    const isPresent = await Customer.findOne({
      email: parsed.data.email,
    }).select("+password");
    if (!isPresent) {
      return res.status(400).json({ error: "not present" });
    }
    const matched = await bcrypt.compare(parsed.data.password, password);

    if (matched) {
      const token = await jwt.sign(
        {
          email: isPresent.email,
          _id: isPresent._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" } // Set token expiration
      );
      return res
        .status(200)
        .cookie("customerToken", token, { httpOnly: true, secure: true })
        .json({
          message: "logged in successfully",
          token,
        });
    }
  } catch (error) {
    console.error("Error during customer login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
