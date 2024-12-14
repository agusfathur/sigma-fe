import jwt from "jsonwebtoken";

function decodeJWT(token: string) {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.error("JWT Decode Error:", error);
    return null;
  }
}

export default decodeJWT;
