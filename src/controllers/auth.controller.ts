import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import { signToken } from "../utils/token";
import { v4 as uuidv4 } from "uuid";

const SALT_ROUNDS = 10;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and profile
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *               name: { type: string }
 *     responses:
 *       201: { description: User registered successfully }
 *       400: { description: Email already in use }
 */
export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already registered" });

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const referralCode = uuidv4().slice(0, 8).toUpperCase();

  const user = await User.create({
    email,
    passwordHash,
    name,
    referralCode,
  });

  const token = signToken({ id: String(user._id), email: user.email });
  res.status(201).json({
    message: "User registered successfully",
    token,
    referralCode: user.referralCode,
  });
}


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: Login successful }
 *       401: { description: Invalid credentials }
 */
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ id: String(user._id), email: user.email });
  res.json({
    message: "Login successful",
    token,
    referralCode: user.referralCode,
  });
}