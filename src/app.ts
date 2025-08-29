import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import {Request, Response,} from 'express'

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: TMDB_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

const handleError = (err: unknown, res: Response) => {
  if (axios.isAxiosError(err)) {
    return res
      .status(err.response?.status || 500)
      .json({ message: err.message });
  }
  res.status(500).json({ message: "Oops! Internal Server Error" });
};

app.get("/api/:platform/popular", async (req: Request, res: Response) => {
  try {
    const { platform } = req.params;
    const fetchEndpoint = `${TMDB_CONFIG.BASE_URL}/discover/${platform}?sort_by=popularity.desc`;
    const response = await axios.get(fetchEndpoint, {
      headers: TMDB_CONFIG.headers,
    });
    res.json(response.data);
  } catch (err) {
    handleError(err, res);
  }
});

app.get("/api/:platform/trending/:time_window", async (req: Request, res: Response) => {
  try {
    const { platform, time_window } = req.params;
    const fetchEndpoint = `${TMDB_CONFIG.BASE_URL}/trending/${platform}/${time_window}`;

    const response = await axios.get(fetchEndpoint, {
      headers: TMDB_CONFIG.headers,
    });
    res.json(response.data);
  } catch (err) {
    handleError(err, res);
  }
});

app.get("/api/:platform/:media_id", async (req: Request, res: Response) => {
  try {
    const { platform, media_id } = req.params;
    const fetchEndpoint = `${TMDB_CONFIG.BASE_URL}/${platform}/${media_id}?api_key=${TMDB_CONFIG.API_KEY}&language=en-US`;

    const response = await axios.get(fetchEndpoint, {
      headers: TMDB_CONFIG.headers,
    });
    res.json(response.data);
  } catch (err) {
    handleError(err, res);
  }
});

app.get("/api/:platform/search", async (req: Request, res: Response) => {
  try {
    const { platform } = req.params;
    const queryParam = req.query.query;
    if (typeof queryParam !== "string" || !queryParam.trim()) {
      return res.status(400).json({ message: "Enter valid query" });
    }
    const fetchEndpoint = `${
      TMDB_CONFIG.BASE_URL
    }/search/${platform}?query=${encodeURIComponent(queryParam)}`;

    const response = await axios.get(fetchEndpoint, {
      headers: TMDB_CONFIG.headers,
    });
    res.json(response.data);
  } catch (err) {
    handleError(err, res);
  }
});

app.get("/api/:platform/:id/providers", async (req: Request, res: Response) => {
  try {
    const { platform, id } = req.params;
    const fetchEndpoint = `${TMDB_CONFIG.BASE_URL}/${platform}/${id}/watch/providers`;

    const response = await axios.get(fetchEndpoint, {
      headers: TMDB_CONFIG.headers,
    });
    res.json(response.data);
  } catch (err) {
    handleError(err, res);
  }
});

app.listen(PORT, () => {
  console.log(`Server is up at ${PORT}`);
});
