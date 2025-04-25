import { jwtDecode, JwtPayload } from "jwt-decode";

interface UserJwtPayload extends JwtPayload {
    userId: string;
    role: string;
  }

export const verifyToken = (token: string) => {
    return jwtDecode(token) as UserJwtPayload;
};
