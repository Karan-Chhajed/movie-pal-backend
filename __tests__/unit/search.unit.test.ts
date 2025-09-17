import { addToSearchList, getSearchList } from "../../src/controllers/searchController";
import { SearchItem } from "../../src/models/Search";

jest.mock("../../src/models/Search");

describe("Search Controller Unit Tests", () => {
  const mockRes: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const mockUserId = "user123";

  beforeEach(() => jest.clearAllMocks());

  it("addToSearchList success", async () => {
    (SearchItem.create as jest.Mock).mockResolvedValue({ media_id: "1" });
    const mockReq: any = { user: { id: mockUserId }, body: { media_id: "1" } };

    await addToSearchList(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ media_id: "1" });
  });

  it("getSearchList success", async () => {
    (SearchItem.find as jest.Mock).mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(["item1"])
    });
    (SearchItem.countDocuments as jest.Mock).mockResolvedValue(1);

    const mockReq: any = { user: { id: mockUserId }, query: {} };

    await getSearchList(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
      items: ["item1"]
    });
  });
});
