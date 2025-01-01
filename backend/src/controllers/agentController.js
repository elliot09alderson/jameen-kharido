import { Agent } from "../models/agent";

const agentSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
  whatsappNumber: z.string().optional(),
});

const optionalAgentSchema = z.object({
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
export async function createAgent(req, res) {
  const { name, email, password, phoneNumber, whatsappNumber } = req.body;
  const parsed = agentSchema.safeParse({
    name,
    email,
    password,
    phoneNumber,
    whatsappNumber,
  });

  const file = req.file;
  const cropParams = {
    gravity: "auto",
    width: 300,
    height: 300,
    crop: "crop",
  };

  try {
    let result = "";
    if (file) {
      result = await cloudinary.uploader.upload(file?.path, {
        folder: "agents",
        resource_type: "raw",
        transformation: cropParams,
      });
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Error deleting the file:", err);
        } else {
          console.log("File deleted successfully:", file.path);
        }
      });
    }

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
    parsed.data.password = encryptedPass;

    const agent = await Agent.create({
      ...parsed.data,
      avatar: result?.url || "",
    });

    if (agent) {
      return res.status(201).json({
        success: true,
        message: "Agent registered successfully",
        agent,
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
export async function getAgentDetails(req, res) {
  const { id } = req.params;

  try {
    // Validate if the agentId is provided
    if (!agentId) {
      return res.status(400).json({
        success: false,
        message: "Agent ID is required",
      });
    }

    // Fetch the agent details by ID
    const agent = await Agent.findById(id)
      .populate("connections", "name email phoneNumber")
      .populate("clients", "name email phoneNumber")
      .populate("documents")
      .select("-password");

    // If agent not found, return a 404 error
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    // Return the agent details
    return res.status(200).json({
      success: true,
      message: "Agent details fetched successfully",
      agent,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function editAgentDetails(req, res) {
  try {
    const { name, email, password, address, phoneNumber } = req.body;

    // Handle the optional image file
    let image = req.file
      ? {
          mimetype: req.file.mimetype,
          size: req.file.size,
          filepath: req.file.path, // Assuming you're using a library like `multer`
        }
      : undefined;

    // Parse and validate the input data using optionalCustomerSchema
    const parsed = optionalAgentSchema.safeParse({
      name,
      email,
      password,
      address,
      phoneNumber,
      image: image ? { mimetype: image.mimetype, size: image.size } : undefined,
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

    // Process the image if provided
    let avatar = undefined;
    if (image) {
      const cropParams = {
        width: 300,
        height: 300,
        crop: "crop",
        gravity: "auto",
      };

      const result = await cloudinary.uploader.upload(image.filepath, {
        folder: "profile",
        transformation: cropParams,
      });

      avatar = result?.url;
    }

    // Update the customer data
    const updatedData = {
      ...parsed.data,
      avatar: avatar || undefined, // Only add avatar if a new image was uploaded
    };

    // Remove undefined fields to ensure only provided fields are updated
    Object.keys(updatedData).forEach(
      (key) => updatedData[key] === undefined && delete updatedData[key]
    );

    const updatedCustomer = await Agent.findOneAndUpdate(
      { email }, // Find customer by email
      { $set: updatedData }, // Update only provided fields
      { new: true, runValidators: true } // Return the updated document and validate updates
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Customer data updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
