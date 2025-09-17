import app from "./app";
import { connectDB } from "./db";

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is up at ${PORT}`));
});