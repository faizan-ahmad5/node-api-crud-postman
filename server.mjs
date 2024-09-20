import { createServer } from "node:http";

const PORT = 3000;

const server = createServer((req, res) => {
  console.log({ method: req.method, url: req.url });
  const { method, url } = req;
  res.setHeader("Content-Type", "application/json");
  const parsedUrl = new URL(url, `http://${req.headers.host}`);

  // Root route
  if (method === "GET" && parsedUrl.pathname === "/") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Welcome to the Home Page" }));
    return;
  }

  // About route
  if (method === "GET" && parsedUrl.pathname === "/about") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "About Page" }));
    return;
  }

  // GET request for items
  if (method === "GET" && parsedUrl.pathname === "/api/items") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "GET request - Fetching all items" }));
    return;
  }
  // POST request for items
  if (method === "POST" && parsedUrl.pathname === "/api/items") {
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
    return;
  }

  // PUT request for items
  if (method === "PUT" && parsedUrl.pathname.startsWith("/api/items/")) {
    let body = "";
    const itemId = parsedUrl.pathname.split("/").pop();
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const updatedItem = JSON.parse(body);
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          message: `PUT request - Updating item ${itemId}`,
          data: updatedItem,
        })
      );
    });
    return;
  }

  // DELETE request for items
  if (method === "DELETE" && parsedUrl.pathname.startsWith("/api/items/")) {
    const itemId = parsedUrl.pathname.split("/").pop();
    res.statusCode = 200;
    res.end(
      JSON.stringify({ message: `DELETE request - Deleting item ${itemId}` })
    );
    return;
  }

  // Error handling
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(PORT, () =>
  console.log(`Server is listening here: http://localhost:${PORT}`)
);
