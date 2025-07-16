import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const accessToken = await this.authService.signUp(signUpDto);
    // Return the access token in the response
    return { 
      message: 'User signed up successfully',
      data: accessToken
    };
  }
 
  @Post('/sign-in')
    async signIn(@Body() signInDto: SignUpDto) {
    const accessToken = await this.authService.signIn(signInDto);

    return{
      message: 'User signed in successfully',
      data: accessToken,
    };
  }
}
