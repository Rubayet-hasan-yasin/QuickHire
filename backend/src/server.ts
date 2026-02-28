import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("❌ DB connection failed:", err);
      process.exit(1);
    });
}

export default app;
