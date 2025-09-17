import { addReview } from "../../src/controllers/reviewController";
import { ReviewItem } from "../../src/models/Review";

jest.mock("../../src/models/Review");

describe("Review Controller Unit Tests", () => {
  const mockRes: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const mockUserId = "user123";

  beforeEach(() => jest.clearAllMocks());

  it("addReview success", async () => {
    (ReviewItem.create as jest.Mock).mockResolvedValue({ id: "1" });
    const mockReq: any = { user: { id: mockUserId }, body: { comments: "Great" } };

    await addReview(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ item: { id: "1" } });
  });
});
