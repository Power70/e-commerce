import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()   
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    role: string;

    @IsOptional()
    isActive?: boolean;
}
 