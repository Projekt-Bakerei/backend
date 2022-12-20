import express from "express";
import {
  signUp,
  signIn,
  users,
  deleteUser,
  updateUser,
} from "../controlers/users.js";

const router = express.Router();

router.get("/users", users);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.put("/update", updateUser);
router.put("/update/user/:id", updateUser);
router.delete("/delete", deleteUser);

export default router;
