import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

if(!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

if (!JWT_EXPIRES_IN) {
  throw new Error("JWT_EXPIRES_IN is not defined in environment variables");
}

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']
  });
}