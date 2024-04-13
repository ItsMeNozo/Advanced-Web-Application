// const JsonWebToken = require("../../servers/lecturer/common/utils/jwt.ts");
// const { userId } = require("../__data__/user.js");
// const axios = require("axios");

// describe("JWT tests", () => {
//   it("should return 401 when logging in with an expired token", async () => {
//     // Create a new instance of JsonWebToken
//     const jwt = new JsonWebToken();

//     // Generate a token that expires after 1 minute
//     const token = await jwt.createToken({ _id: userId }, { expiresIn: "1000" });

//     // Wait for the token to expire
//     await new Promise((resolve) => setTimeout(resolve, 60000 + 1000)); // wait for 1 minute and 1 second

//     // Try to verify the expired token
//     try {
//       await jwt.verifyToken(token);
//     } catch (error) {
//       // Expect a JsonWebTokenError with message 'jwt expired'
//       expect(error).toBeInstanceOf(jwt.JsonWebTokenError);
//       expect(error.message).toBe("jwt expired");
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5001/v1/auth/login",
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//     } catch (error) {
//       expect(error.response.status).toBe(401);
//     }
//   });
// });
const { ObjectId } = require("mongodb");
const _id = new ObjectId();
console.log(_id);
