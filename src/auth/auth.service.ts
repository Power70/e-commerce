import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up-auth.dto';
import { SignInDto } from './dto/sign-in-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ accessToken: string }> {
    const user = await this.userService.create(signUpDto);

    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async signIn(signInDto: SignInDto) {
    if (!signInDto.email) {
      throw new BadRequestException('Email is required');
    }
    // Check if user exists
    const user = await this.userService.findByEmail(signInDto.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (!signInDto.password || !user.password) {
      throw new BadRequestException('Password is required');
    }
    // 
    const PassworMatch = await bcrypt.compare(String(signInDto.password), String(user.password));
    if (!PassworMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    // prepare some user data to be included in the JWT token
    // create a payload with user information
    // this payload will be used to generate the JWT token
    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
