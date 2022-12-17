import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || email.length < 5 || !password || password.length < 5) {
      return res.status(400).json({ error: "yanlis giris" });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      passwordHash,
    });

    await user.save();
    return res.json({ msg: "tamam" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server hatasi" });
  }
};

export const signIn = async (res, req) => {
  try {
    const { email, password } = req.body;
    if (!email || email.length < 5 || !password || password.length < 5) {
      return res.status(400).json({ error: "yanlis giris" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "müsteri bulunamadi" });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(400).json({ error: "parola yanlis girildi" });
    }

    const token = jwt.sign(
      { email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: 60000,
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server hatasi" });
  }
};
