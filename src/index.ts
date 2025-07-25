import { Hono } from "hono";
import { cors } from "hono/cors";
import notes from "./routes/notes.route";
import files from "./routes/files.route";
import filesWorkers from "./routes/files-workers.route";
import images from "./routes/images.route";
import { ContextExtended } from "./types";

const app = new Hono();

// TODO: In-Workshop Activities.
// Define allowed origins
const allowedOrigins = new Set([
  "http://localhost:5173",
  "https://<your-domain>.<tld>",
]);

// https://hono.dev/docs/middleware/builtin/cors
app.use(
  "*",
  cors({
    origin: (origin: string) => {
      if (allowedOrigins.has(origin)) {
        return origin; // Allow this origin
      }
      return null; // Disallow this origin
    },
    credentials: true,
    allowMethods: ["POST", "GET", "DELETE", "PUT"],
    allowHeaders: [
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Cache-Control",
    ],
  })
);

app.get("/", (c: ContextExtended) => {
  return c.text("Hello BlazeHack!");
});

app.route("/notes", notes);
app.route("/files", files);
app.route("/files-workers", filesWorkers);
app.route("/images", images);

export default app;
