import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class CreateAuthDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    @IsNotEmpty()
    userName: string
}
