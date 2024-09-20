import { createServer } from "node:http";

const PORT = 3000;

const server = createServer((req, res) => {
  console.log({ method: req.method, url: req.url });
  const { method, url } = req;
  res.setHeader("Content-Type", "application/json");
  const parsedUrl = new URL(url, `http://${req.headers.host}`);

  // GET request
  if (method === "GET" && parsedUrl.pathname === "/api/items") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "GET request - Fetching all items" }));
    return; // Prevent further execution
  }

  // POST request
  else if (method === "POST" && parsedUrl.pathname === "/api/items") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newItem = JSON.parse(body);
      res.statusCode = 201;
      res.end(
        JSON.stringify({
          message: "POST request - Adding new item",
          data: newItem,
        })
      );
    });
    return; // Prevent further execution
  }
});

server.listen(PORT, () =>
  console.log(`Server is listening here: http://localhost:${PORT}`)
);
