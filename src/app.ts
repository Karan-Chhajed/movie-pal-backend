import express from "express";
import { connectDB } from "./db";
import dotenv from "dotenv";
import watchlistRoutes from "./routes/watchlistRoutes";
import { protect } from "./middleware/authMiddleware";
import searchRoutes from "./routes/searchRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import tmdbRoutes from "./routes/tmdbRoutes";
import userRoutes from './routes/userRoutes'

dotenv.config();

const PORT = process.env.PORT || 4000
const app = express();
app.use(express.json())

app.use('/api/tmdb', tmdbRoutes)
app.use('/api/user', userRoutes)
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/search', protect, searchRoutes)
app.use('/api/review', protect, reviewRoutes);


connectDB().then(() => {
  app.listen(PORT, () => 
  console.log(`Server is up at ${PORT}`));
})
