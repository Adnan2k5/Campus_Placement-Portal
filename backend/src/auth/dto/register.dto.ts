import { Equals, IsEmail, IsEnum, IsNotEmpty } from "class-validator";

export enum Role{
    student = 'student',
    recruiter = 'recruiter',
    admin = 'admin'
}

export class RegisterDto {
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    password: string;
    
    @IsNotEmpty()
    name: string;
}

export class StudentRegisterDto extends RegisterDto {
    @IsNotEmpty()
    university: string
    @IsNotEmpty()
    degree: string
    @IsNotEmpty()
    graduationYear: number
    @IsNotEmpty()
    universityId: string
}
export class RecruiterRegisterDto extends RegisterDto {
    @IsNotEmpty()
    companyName: string
    @IsNotEmpty()
    position: string
}