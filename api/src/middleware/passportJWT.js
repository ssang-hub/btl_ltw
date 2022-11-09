import { ExtractJwt, Strategy } from "passport-jwt";
import dotenv from "dotenv";
import passport from "passport";
dotenv.config();

const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
    secretOrKey: process.env.JWT_SECRET_KEY,
  },
  (jwt_payload, done) => {
    try {
      return done(null, jwt_payload);
    } catch (error) {
      console.log("error: " + error);
      done(error, false);
    }
  }
);

passport.use(jwtStrategy);
export default passport;
