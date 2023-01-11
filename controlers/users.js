import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const users = async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "server hatasi" });
  }
};

export const signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    if (!email || email.length < 5 || !password || password.length < 5) {
      return res.status(400).json({ error: "hatali giris" });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    await user.save();
    return res.json({ msg: "ok" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log("signIn called: email: ", email, "password: ", password);
    // Validierung
    if (!email || email.length < 5 || !password || password.length < 5) {
      return res.status(400).json({ error: "hatali giris" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(400).json({ error: "password does not match" });
    }
    const token = jwt.sign(
      { email, role: user.role, name: user.firstName },
      process.env.JWT_SECRET,
      {
        expiresIn: 100000 * 60,
      }
    );
    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
};

export const updateUser = async (res, req) => {
  try {
    const { email, password } = req.body;
    const user = user;

    if (!email || email.length < 5 || !password || password.length < 5) {
      return res.status(400).json({ error: "hatali giris" });
    }

    const responce = await User.findOne({ email });
    console.log("User find: ", responce);

    if (!user) {
      return res.status(400).json({ error: "müsteri bulunamadi" });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(400).json({ error: "parola yanlis" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiredIn: 900,
    });

    user = await User.updateOne(
      { _id: user._id },
      { name: user.name, email: user.email, role: user.role }
    );
    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server hatasi" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = user;
    //console.log("signIn called: email: ", email, "password: ", password);
    // Validierung
    if (!email || email.length < 5 || !password || password.length < 5) {
      return res.status(400).json({ error: "hatali giris" });
    }

    const responce = await User.findOne({ email });
    console.log("User find: ", responce);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(400).json({ error: "parola yanlis" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 900,
    });

    user = await User.deleteOne({ _id: user._id });

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server hatasi" });
  }
};
