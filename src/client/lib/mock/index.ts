import { setupWorker, rest } from "msw";
import tests from "./data/tests";
const worker = setupWorker(
  rest.post("/api/tests", async (req, res, ctx) => {
    return res(ctx.json(tests));
  })
);
worker.start();
