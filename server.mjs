import { createServer } from "node:http";

const PORT = 3000;

const server = createServer((req, res) => {
  console.log({ method: req.method, url: req.url });
  const { method, url } = req;
  res.setHeader("Content-Type", "application/json");
  const parsedUrl = new URL(url, `http://${req.headers.host}`);

  // get request
  if (method === "GET" && parsedUrl.pathname === "/api/items") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "GET request - Fetching all items" }));
  }

  res.statusCode = 200;
  res.end("Server is running");
});

server.listen(PORT, () =>
  console.log(`Server is listening here: http://localhost:${PORT}`)
);
