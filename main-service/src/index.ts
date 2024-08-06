import app from "./app";
import { PORT } from "./config";

app.listen(PORT, () => {
  console.log(`Main service running on http://localhost:${PORT}`);
});
