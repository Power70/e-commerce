import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signUp(@Body() createAuthDto: SignUpDto) {
    const accessToken = await this.authService.signUp(createAuthDto);
    // Return the access token in the response
    return { 
      message: 'User signed up successfully',
      data: accessToken
    };
  }
 
  @Post()
    signIn(@Body() createAuthDto: SignUpDto) {
    return this.authService.signUp(createAuthDto);
  }
}
