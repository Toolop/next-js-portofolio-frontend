import { authService } from "../auth";

global.fetch = jest.fn();

describe("authService", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe("login", () => {
    it("should return success when login is successful", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: "fake-token" }),
      });

      const result = await authService.login({
        email: "test@example.com",
        password: "password123",
      });

      expect(result.success).toBe(true);
    });

    it("should return error when login fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "Invalid credentials" }),
      });

      const result = await authService.login({
        email: "test@example.com",
        password: "wrong-password",
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe("Invalid credentials");
    });
  });

  describe("register", () => {
    it("should return success when registration is successful", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { id: 1 } }),
      });

      const result = await authService.register({
        name: "Test User",
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      expect(result.success).toBe(true);
    });
  });
});
