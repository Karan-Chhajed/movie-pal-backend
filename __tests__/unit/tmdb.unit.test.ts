import { getPopularMedia, getTrendingMedia, getDetails, getSearchMedia, getMediaProviders } from "../../src/controllers/tmdbController";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("TMDB Controller Unit Tests", () => {
  const mockRes: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    // Fix for axios.isAxiosError
    (axios.isAxiosError as unknown as jest.Mock) = jest.fn(() => true);
  });

  it("getPopularMedia success", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { results: ["popular"] } });
    const mockReq: any = { params: { platform: "movie" } };

    await getPopularMedia(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({ results: ["popular"] });
  });

  it("getTrendingMedia success", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { results: ["trending"] } });
    const mockReq: any = { params: { platform: "tv", time_window: "day" } };

    await getTrendingMedia(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({ results: ["trending"] });
  });

  it("getDetails success", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { id: 123 } });
    const mockReq: any = { params: { platform: "movie", media_id: "123" } };

    await getDetails(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({ id: 123 });
  });

  it("getSearchMedia missing query", async () => {
    const mockReq: any = { params: { platform: "movie" }, query: {} };

    await getSearchMedia(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Enter valid query" });
  });

  it("getSearchMedia success", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { results: ["search"] } });
    const mockReq: any = { params: { platform: "movie" }, query: { query: "batman" } };

    await getSearchMedia(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({ results: ["search"] });
  });

  it("getMediaProviders success", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { results: ["Netflix"] } });
    const mockReq: any = { params: { platform: "movie", id: "123" } };

    await getMediaProviders(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({ results: ["Netflix"] });
  });

  it("handles axios error with status code", async () => {
    const axiosError: any = new Error("Request failed");
    axiosError.response = { status: 404 };

    mockedAxios.get.mockRejectedValueOnce(axiosError);
    const mockReq: any = { params: { platform: "movie" } };

    await getPopularMedia(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Request failed" });
  });

  it("handles axios error with no response defaults to 500", async () => {
    const axiosError: any = new Error("Network error");
    axiosError.response = undefined;

    mockedAxios.get.mockRejectedValueOnce(axiosError);
    const mockReq: any = { params: { platform: "movie" } };

    await getPopularMedia(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Network error" });
  });
});
