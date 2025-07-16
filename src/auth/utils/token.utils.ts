import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/entities/user.entity";

export const generateToken = (user: User, jwtService: JwtService) => {
    // prepare some user data to be included in the JWT token
    // create a payload with user information
    // this payload will be used to generate the JWT token
    const payload = {
        sub: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    };
    return  jwtService.signAsync(payload);
};