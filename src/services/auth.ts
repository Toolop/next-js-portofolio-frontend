import { z } from "zod";

// Call local API routes (BFF pattern)
const AUTH_API_URL = "/api/auth";

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
}

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${AUTH_API_URL}/register`, {
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
          message: result.message || "Registration failed. Please check your data.",
        };
      }

      return {
        success: true,
        message: result.message || "Registration successful",
        data: result.data,
      };
    } catch (error) {
      console.error("Register Service Error:", error);
      return {
        success: false,
        message: error instanceof TypeError ? "Connection error. Please check your internet." : "An unexpected error occurred.",
      };
    }
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${AUTH_API_URL}/login`, {
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
          message: result.message || "Login failed. Invalid credentials.",
        };
      }

      return {
        success: true,
        message: result.message || "Login successful. Redirecting...",
      };
    } catch (error) {
      console.error("Login Service Error:", error);
      return {
        success: false,
        message: error instanceof TypeError ? "Connection error. Please check your internet." : "An unexpected error occurred.",
      };
    }
  },

  async logout(): Promise<void> {
    // We'll implement a logout API route next turn to clear the cookie
    await fetch(`${AUTH_API_URL}/logout`, { method: "POST" });
  }
};
