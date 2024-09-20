import { createServer } from "node:http";

const PORT = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.end("Server is running");
});

server.listen(PORT, () =>
  console.log(`Server is listening here: http://localhost:${PORT}`)
);
