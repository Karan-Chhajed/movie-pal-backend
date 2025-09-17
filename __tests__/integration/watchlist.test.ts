import { addToWatchlist, deleteFromWatchlist, getWatchlist } from "../../src/controllers/watchlistController";
import { WatchlistItem } from "../../src/models/WatchLists";

jest.mock("../../src/models/WatchLists");

describe("Watchlist Controller Integration Tests", () => {
  const mockRes: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const mockUserId = "user123";

  beforeEach(() => jest.clearAllMocks());

  const fullReqAdd: any = { user: { id: mockUserId }, body: { media_id: "1", title: "Movie 1", overview: "desc", media_type: "movie", vote_average: 9, genres: ["Action"], poster_url: "url" } };
  const fullReqDelete: any = { user: { id: mockUserId }, body: { media_id: "1" } };
  const fullReqGet: any = { user: { id: mockUserId }, query: { page: 1, limit: 10 } };

  it("addToWatchlist", async () => {
    (WatchlistItem.create as jest.Mock).mockResolvedValue(fullReqAdd.body);
    await addToWatchlist(fullReqAdd, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(fullReqAdd.body);
  });

  it("deleteFromWatchlist", async () => {
    (WatchlistItem.findOneAndDelete as jest.Mock).mockResolvedValue({});
    await deleteFromWatchlist(fullReqDelete, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Watchlist item deleted", media_id: "1" });
  });

  it("getWatchlist", async () => {
    (WatchlistItem.find as jest.Mock).mockReturnValue({ sort: jest.fn().mockReturnThis(), skip: jest.fn().mockReturnThis(), limit: jest.fn().mockResolvedValue([fullReqAdd.body]) });
    (WatchlistItem.countDocuments as jest.Mock).mockResolvedValue(1);
    await getWatchlist(fullReqGet, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
      items: [fullReqAdd.body],
    });
  });
});
