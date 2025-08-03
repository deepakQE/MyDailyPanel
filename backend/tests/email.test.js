const request = require("supertest");
const app = require("../src/app");

describe("POST /api/email/digest", () => {
  it("should return 400 if missing fields", async () => {
    const res = await request(app).post("/api/email/digest").send({});
    expect(res.statusCode).toBe(400);
  });

  it("should return 200 OK on valid send (mocked)", async () => {
    jest.mock("nodemailer", () => ({
      createTransport: () => ({
        sendMail: jest.fn().mockResolvedValue(true)
      })
    }));

    const res = await request(app)
      .post("/api/email/digest")
      .send({ to: "test@example.com", summary: "Hello summary!" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
