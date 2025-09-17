import { registerUser, loginUser } from "../../src/controllers/userController";
import { User } from "../../src/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("../../src/models/User");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("User Controller Integration Tests", () => {
  const mockRes: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  beforeEach(() => jest.clearAllMocks());

  it("registerUser success", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed");
    (User.prototype.save as jest.Mock).mockResolvedValue({});

    const mockReq: any = {
      body: {
        username: "Karan",
        email: "karan@example.com",
        password: "1234",
        region: "IN",
      },
    };

    await registerUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "User registered Successfully" });
  });

  it("loginUser success", async () => {
    const user: any = { _id: "123", email: "karan@example.com", password: "hashed" };
    (User.findOne as jest.Mock).mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("token123");

    const mockReq: any = {
      body: { email: "karan@example.com", password: "1234" },
    };

    await loginUser(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({ message: "Login Successful!", token: "token123" });
  });
});
