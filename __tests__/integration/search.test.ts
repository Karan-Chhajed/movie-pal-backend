import { addToSearchList, getSearchList } from "../../src/controllers/searchController";
import { SearchItem } from "../../src/models/Search";

jest.mock("../../src/models/Search");

describe("Search Controller Integration Tests", () => {
  const mockRes: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const mockUserId = "user123";

  beforeEach(() => jest.clearAllMocks());

  const fullReqAdd = { user: { id: mockUserId }, body: { media_id: "1", title: "Movie", overview: "desc", media_type: "movie", vote_average: 9, genres: ["Action"], poster_url: "url" } };
  const fullReqGet = { user: { id: mockUserId }, query: { page: 1, limit: 10 } };

  it("addToSearchList", async () => {
    (SearchItem.create as jest.Mock).mockResolvedValue(fullReqAdd.body);
    await addToSearchList(fullReqAdd as any, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(fullReqAdd.body);
  });

  it("getSearchList", async () => {
    (SearchItem.find as jest.Mock).mockReturnValue({ skip: jest.fn().mockReturnThis(), limit: jest.fn().mockResolvedValue([fullReqAdd.body]) });
    (SearchItem.countDocuments as jest.Mock).mockResolvedValue(1);
    await getSearchList(fullReqGet as any, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
      items: [fullReqAdd.body],
    });
  });
});
