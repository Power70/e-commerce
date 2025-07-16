import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService, // Assuming JwtService is imported and used for JWT operations
    private readonly userService: UserService, // Assuming UserService is injected for user operations
  ) {}


 async signUp(createAuthDto: SignUpDto) {
   const  user = await this.userService.create(createAuthDto); // Assuming create method in UserService handles user creation
  //  generate JWT token after user creation

  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive,
  };
  const accessToken = await this.jwtService.signAsync(payload); // Assuming signAsync method generates a JWT token
    // return the access toke
    return accessToken
  }

}
