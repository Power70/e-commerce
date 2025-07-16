import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up-auth.dto';
import { SignInDto } from './dto/sign-in-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { generateToken } from './utils/token.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userService.create(signUpDto);

    return generateToken(user, this.jwtService);
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
   
    return generateToken(user, this.jwtService);
  }
}
