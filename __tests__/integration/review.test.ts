import { addReview } from "../../src/controllers/reviewController";
import { ReviewItem } from "../../src/models/Review";

jest.mock("../../src/models/Review");

describe("Review Controller Integration Tests", () => {
  const mockRes: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const mockUserId = "user123";

  beforeEach(() => jest.clearAllMocks());

  const fullReq = {
    user: { id: mockUserId },
    body: {
      name: "John",
      company: "ABC Corp",
      designation: "Engineer",
      email: "john@example.com",
      linkedin: "linkedin.com/in/john",
      comments: "Great product!",
      device_name: "iPhone",
    },
  };

  it("addReview success", async () => {
    (ReviewItem.create as jest.Mock).mockResolvedValue({ id: "1", ...fullReq.body });
    await addReview(fullReq as any, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ item: { id: "1", ...fullReq.body } });
  });

  it("addReview error", async () => {
    (ReviewItem.create as jest.Mock).mockRejectedValue(new Error("DB error"));
    await addReview(fullReq as any, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Error submitting review: Error: DB error" });
  });
});
