import { addToWatchlist, deleteFromWatchlist, getWatchlist } from "../../src/controllers/watchlistController";
import { WatchlistItem } from "../../src/models/WatchLists";

jest.mock("../../src/models/WatchLists");

describe("Watchlist Controller Unit Tests", () => {
  const mockRes: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const mockUserId = "user123";

  beforeEach(() => jest.clearAllMocks());

  it("addToWatchlist success", async () => {
    (WatchlistItem.create as jest.Mock).mockResolvedValue({ media_id: "1" });
    const mockReq: any = { user: { id: mockUserId }, body: { media_id: "1" } };

    await addToWatchlist(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ media_id: "1" });
  });

  it("deleteFromWatchlist success", async () => {
    (WatchlistItem.findOneAndDelete as jest.Mock).mockResolvedValue({});
    const mockReq: any = { user: { id: mockUserId }, body: { media_id: "1" } };

    await deleteFromWatchlist(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({ message: "Watchlist item deleted", media_id: "1" });
  });

  it("getWatchlist success", async () => {
    (WatchlistItem.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(["item1"])
    });
    (WatchlistItem.countDocuments as jest.Mock).mockResolvedValue(1);

    const mockReq: any = { user: { id: mockUserId }, query: {} };

    await getWatchlist(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
      items: ["item1"]
    });
  });
});
