import { config } from "dotenv";
import prisma from "../utils/prisma.js";

config();

const key = process.env.CLERK_API_KEY;
const createAdmin = async (req) => {
  const { email, password, name } = req.body;
  console.log(key);
  try {
    const response = await fetch("https://api.clerk.dev/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        email_address: email,
        password,
        // user_name: name,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      const adminId = data.id;
      const user = await prisma.admin.create({
        data: {
          email,
          password,
          name,
          adminId,
        },
      });
      //   res.status(200).json({ message: "admin succesfully created", user });
      console.log("admin created succesfully");
    } else {
      //   res.status(response.status).json({ message: data.message });
      console.log(response);
      console.log("something went wrong");
    }
  } catch (err) {
    console.error(err.message);
    console.log("server error");
    // res
    //   .status(500)
    //   .json({ message: "Internal server error", error: err.message });
  }
};

export { createAdmin };
