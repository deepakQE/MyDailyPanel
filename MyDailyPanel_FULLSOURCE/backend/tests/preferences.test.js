const request = require("supertest");
const app = require("../src/app");

describe("Preferences API", () => {
  it("should return 400 if email missing (GET)", async () => {
    const res = await request(app).get("/api/preferences/");
    expect(res.statusCode).toBe(404); // because :email param is required
  });

  it("should return 400 on POST without email/preferences", async () => {
    const res = await request(app).post("/api/preferences/save").send({});
    expect(res.statusCode).toBe(400);
  });
});
