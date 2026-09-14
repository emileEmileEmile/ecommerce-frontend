import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    sub: number;
    email: string;
    role: string;
    iat: number;
    exp: number;
}


export const getUserRole = (): string | null => {
    const token = localStorage.getItem('access_token');

    if (!token) {
        return null;
    }

    const decoded = jwtDecode<TokenPayload>(token);

    return decoded.role;
};