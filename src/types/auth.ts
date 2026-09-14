export interface LoginInput {
    email: string;
    password: string;
}
  
export interface RegisterInput {
    email: string;
    password: string;
}
  
export interface AuthResponse {
    access_token: string;
}