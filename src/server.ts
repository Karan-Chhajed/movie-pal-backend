import { connectDB } from './db';
import app from './app';
const PORT = parseInt(process.env.PORT || '4000', 10);

(async () => {
  try {
    console.log('Connecting to DB...');
    await connectDB();
    console.log('DB connected successfully');

    app.listen(PORT, '0.0.0.0', () => console.log(`Server is up at ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1); // exit with failure
  }
})();




