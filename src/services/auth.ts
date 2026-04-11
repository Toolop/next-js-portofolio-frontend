import { z } from "zod";

const BASE_URL = "https://api-portofolio.declarationdigital.tech";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
  token?: string;
}

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "Registration failed",
        };
      }

      return {
        success: true,
        message: "Registration successful",
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Network error, please try again later",
      };
    }
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "Login failed",
        };
      }

      // Security: Handle token storage safely (should be in Cookie for production)
      // For this implementation, we return it for the caller to handle
      return {
        success: true,
        message: "Login successful",
        token: result.token || result.data?.token,
      };
    } catch (error) {
      return {
        success: false,
        message: "Network error, please try again later",
      };
    }
  },
};
