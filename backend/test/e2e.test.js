const request = require("supertest");
const { app, startServer, stopServer } = require("../app");
const db = require("../models");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/server");

let token;

beforeAll(async () => {
  await startServer();
  await db.sequelize.sync({ force: true });

  // Register and login a test user
  await request(app)
    .post("/api/users/register")
    .send({ username: "testuser", password: "password123" });

  const loginResponse = await request(app)
    .post("/api/users/login")
    .send({ username: "testuser", password: "password123" });

  token = loginResponse.body.token;
});

afterAll(async () => {
  await stopServer();
  await db.sequelize.close();
});

describe("E2E Test", () => {
  it("should store and retrieve the same file", async () => {
    const uploadResponse = await request(app)
      .post("/api/files/upload")
      .set("Authorization", `Bearer ${token}`)
      .attach("file", Buffer.from("test file content"), "testFile.txt")
      .field("metadata", JSON.stringify({ key: "value" }));

    expect(uploadResponse.statusCode).toBe(201);
    expect(uploadResponse.body.message).toBe("File uploaded successfully");

    const listResponse = await request(app)
      .get("/api/files")
      .set("Authorization", `Bearer ${token}`);

    expect(listResponse.statusCode).toBe(200);
    expect(listResponse.body).toHaveLength(1);
    expect(listResponse.body[0].filename).toBe("testFile.txt");
  });
});
