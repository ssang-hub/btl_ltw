import jwt from "jsonwebtoken";
// import UserModel from "../models/userModel";
// import refreshTokens from "../models/refreshTokenModel";
import dotenv from "dotenv";
dotenv.config();
// const refreshToken = async (req, res) => {
//   //take the refresh token from the user
//   const refreshToken = req.body.token;

//   //send error if there is no token or it's invalid
//   if (!refreshToken) return res.status(401).json("You are not authenticated!");
//   const tokens = await refreshTokens.findRefreshToken(refreshToken);
//   // const tokens = await refreshTokens.find({ info: refreshToken });
//   console.log(tokens);
//   if (!tokens) {
//     return res.status(403).json("Refresh token is not valid!");
//   }
//   // if (!refreshTokens.includes(refreshToken)) {
//   //   return res.status(403).json("Refresh token is not valid!");
//   // }
//   jwt.verify(refreshToken, variable.JWT_SECRET_KEY, async (err, user) => {
//     err && console.log(err);
//     console.log(user);
//     const deleteResult = await refreshTokens.findAndDeleteRefreshToken(refreshToken);
//     const newAccessToken = generateAccessToken(user);
//     const newRefreshToken = generateRefreshToken(user);

//     await refreshTokens.createRefreshToken(newRefreshToken);

//     res.status(200).json({
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken,
//     });
//   });
// };

// generate access token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

// generate RefreshToken
const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY);
};
// const checkAdmin = (req, res, next) => {
//   if (req.user.isAdmin) {
//     next();
//   } else {
//     res.json("ban chua phai la nguoi ban hang");
//   }
// };
// const logout = (req, res) => {
//   const refreshToken = req.body.token;
//   refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
//   res.status(200).json("You logged out successfully.");
// };

// const authVerify = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];

//     jwt.verify(token, variable.JWT_SECRET_KEY, (err, user) => {
//       if (err) {
//         res.redirect(307, "/api/refresh");
//         // return res.status(403).json("Token is not valid!");
//       }

//       req.user = user;
//       next();
//     });
//   } else {
//     res.status(401).json("You are not authenticated!");
//   }
// };

// const deleteToken = (req, res) => {
//   if (req.user.id === req.params.userId || req.user.isAdmin) {
//     res.status(200).json("User has been deleted.");
//   } else {
//     res.status(403).json("You are not allowed to delete this user!");
//   }
// };

export { generateRefreshToken, generateAccessToken };
