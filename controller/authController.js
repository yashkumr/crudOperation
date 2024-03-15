import userModel from "../modal/userModel.js";
import slugify from "slugify";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, country } = req.body;
    

    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!country) {
      return res.send({ message: "country is required" });
    }

    //check user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        message: false,
        message: "Already register please login",
      });
    }
    //save user
    const user = await new userModel({
      name,
      slug: slugify(name),
      email,
      password,
      country,
    }).save();
    res.status(200).send({
      success: true,
      message: "user register successsfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in registercontroller",
      error,
    });
  }
};

export const allUserController = async (req, res) => {
  try {
    const user = await userModel.find({});

    res.status(200).send({
      success: true,
      message: "fetched users",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in fetching",
      error,
    });
  }
};

export const deleteController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "user deleted successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in deletion",
      error,
    });
  }
};

export const singleUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ slug: req.params.slug });
    console.log(user);
    res.status(200).send({
      success: true,
      message: "Get SIngle user SUccessfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in single registercontroller",
      error,
    });
  }
};

export const updatgeController = async (req, res) => {
  try {
    const { name, email, password, country } = req.body;
    console.log(req.body);

    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!country) {
      return res.send({ message: "country is required" });
    }

    //check user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        message: false,
        message: "Already register please login",
      });
    }

    const users = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.body, slug: slugify(name) },
      { new: true }
    );
    //save user
    await users.save();
    res.status(201).send({
      success: true,
      message: "users Updated Successfully",
      users,
    });
    res.status(200).send({
      success: true,
      message: "user register successsfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in registercontroller",
      error,
    });
  }
};
