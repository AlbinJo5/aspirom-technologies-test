import request from "supertest";
import app from "../src/app";

describe("User Service", () => {
  let userId;

  it("should create a new user", async () => {
    const response = await request(app)
      .post("/api/v1/web/user")
      .send({ name: "John Doe", email: "john2@example.com" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.name).toBe("John Doe");
    expect(response.body.data.email).toBe("john2@example.com");

    userId = response.body.data._id;
  }, 10000);

  it("should retrieve user details by ID", async () => {
    const response = await request(app).get(`/api/v1/web/user/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.name).toBe("John Doe");
    expect(response.body.data.email).toBe("john2@example.com");
  }, 10000);
});
