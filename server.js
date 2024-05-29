// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write("Hello world")

//     return response.end()
// })

// // localhost:3333
// server.listen(3333)

import { fastify } from "fastify";
// import { DataBaseMemory } from "./database-memory.js";
import { DataBasePostgres } from "./database-postgres.js";

const server = fastify();

// const database = new DataBaseMemory();
const database = new DataBasePostgres()

// GET, POST, PUT, DELETE, PATCH
// Route Parameter
// Request Body

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });
  return reply.status(201).send();
});

server.get("/videos", async (request) => {
  const search = request.query.search;

  const videos = await database.list(search);
  return videos;
});

server.put("/videos/:id", async (request, reply) => {
  const videosId = request.params.id;
  const { title, description, duration } = request.body;

  await database.update(videosId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/videos/:id", async (request, reply) => {
  const videosId = request.params.id;
  await database.delete(videosId);

  return reply.status(204).send();
});

server.listen({
  port: process.env.PORT ?? 3333,
});
