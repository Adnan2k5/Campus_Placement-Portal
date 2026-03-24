import { BadRequestException, Injectable } from '@nestjs/common';
import { RecruiterRegisterDto, RegisterDto, StudentRegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Recruiter, RecruiterDocument, Student, StudentDocument, User, UserDocument } from 'schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, 
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    @InjectModel(Recruiter.name) private recruiterModel: Model<RecruiterDocument>) {}
    private async findUserByEmail(email: string) {
        return this.userModel.findOne({ email });
    }
    private async createUser(dto: RegisterDto, role: string) {
        const hashPassword = await bcrypt.hash(dto.password, 10);
        return this.userModel.create({
            name: dto.name,
            email: dto.email,
            password: hashPassword,
            role
        })
    }
    async registerStudent(dto: StudentRegisterDto){
        const user = await this.findUserByEmail(dto.email);
        if(user){
            throw new BadRequestException('User already exists');
        }

        const createdUser = await this.createUser(dto, 'student');

        const studentData = await this.studentModel.create({
            userId: createdUser._id as Types.ObjectId,
            university: dto.university,
            degree: dto.degree,
            graduationYear: dto.graduationYear,
            universityId: dto.universityId
        })

        return {
            success: true,
            message: 'Student registered successfully',
            data: {
                userId: createdUser._id,
                studentId: studentData._id
            },
        };
    }
    async registerRecruiter(dto: RecruiterRegisterDto){
        const user = await this.findUserByEmail(dto.email);
        if(user){
            throw new BadRequestException('User already exists');
        }
        
        const createdUser = await this.createUser(dto, 'recruiter');
        
        const recruiterData = await this.recruiterModel.create({
            userId: createdUser._id as Types.ObjectId,
            companyName: dto.companyName,
            position: dto.position,
            approved: false
        })

        return {
            success: true,
            message: 'Recruiter registered successfully',
            data: { 
                userId: createdUser._id,
                recruiterId: recruiterData._id
            },
        };
    }  
    async register(dto: RegisterDto){
        const user = await this.findUserByEmail(dto.email);
        if(user){
            throw new BadRequestException('User already exists');
        }
        
        const createdUser = await this.createUser(dto, 'admin');
        
        return {
            success: true,
            message: 'Admin registered successfully',
            data: {
                userId: createdUser._id,
            },
        };
    }
}