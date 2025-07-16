import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from './sign-up-auth.dto';

export class SignInDto extends PartialType(SignUpDto) {}
