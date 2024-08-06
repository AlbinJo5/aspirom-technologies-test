import request from "supertest";
import app from "../src/app";
import axios from "axios";
// const random email genrato
const randomEmail = () => {
  return Math.random().toString(36).substring(7) + "@gmail.com";
};
describe("Product Service", () => {
  let productId;
  let userId;

  // call an external API to userr service
  beforeAll(async () => {
    try {
      // Fetch API
      const response = await axios.post(
        "http://localhost:5000/user-service/api/v1/web/user",
        {
          name: "John Doe",
          email: randomEmail(),
        }
      );

      userId = response.data.data._id;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  });

  // generate a sample test code
  it("should log the user ID", () => {
    console.log(userId);
  });

  it("should create a new product", async () => {
    const response = await request(app).post("/api/v1/web/product").send({
      name: "Sample Product",
      price: 100,
      userId: userId,
      description: "sample description",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.name).toBe("Sample Product");
    expect(response.body.data.price).toBe(100);
    expect(response.body.data.description).toBe("sample description");
    expect(response.body.data.userId).toBe(userId);

    productId = response.body.data._id;
  });

  it("should retrieve product details by ID", async () => {
    const response = await request(app).get(`/api/v1/web/product/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.name).toBe("Sample Product");
    expect(response.body.data.price).toBe(100);
    expect(response.body.data.userId).toBe(userId);
  });

  it("should retrieve products by user ID", async () => {
    const response = await request(app).get(
      `/api/v1/web/product/user/${userId}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0]).toHaveProperty("_id");
    expect(response.body.data[0].name).toBe("Sample Product");
    expect(response.body.data[0].price).toBe(100);
    expect(response.body.data[0].userId).toBe(userId);
  });

  afterAll(async () => {
    try {
      await axios.delete(
        `http://localhost:5000/user-service/api/v1/web/user/${userId}`
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  });
});
