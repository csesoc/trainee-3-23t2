import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  return {
    token: jwt.sign({ userId: userId }, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    }),
    expiredBy: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
  };
};
