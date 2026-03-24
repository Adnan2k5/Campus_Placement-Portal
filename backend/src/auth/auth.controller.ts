import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  RecruiterRegisterDto, RegisterDto,  StudentRegisterDto } from './dto/register.dto';
import { BadRequestException } from '@nestjs/common';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register/student')
  register(@Body() dto: StudentRegisterDto){
    if(!dto){
      throw new BadRequestException('Invalid Payload');
    }
    return this.authService.registerStudent(dto);
  }
  @Post('register/recruiter')
  registerRecruiter(@Body() dto: RecruiterRegisterDto){
    if(!dto){
      throw new BadRequestException('Invalid Payload');
    }
    return this.authService.registerRecruiter(dto);
  }
  @Post('register/admin')
  registerAdmin(@Body() dto: RegisterDto){
    if(!dto){
      throw new BadRequestException('Invalid Payload');
    }
    return this.authService.register(dto);
  }
}


//Test