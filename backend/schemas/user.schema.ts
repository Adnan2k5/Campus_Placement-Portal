import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document & { _id: Types.ObjectId };
@Schema({timestamps: true})
export class User {
    @Prop({required: true})
    name: string;
    @Prop({required: true, unique: true})
    email: string;
    @Prop({required: true})
    password: string;
    @Prop({required: true, enum: ['student', 'recruiter', 'admin']})
    role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);


export type StudentDocument = Student & Document & { _id: Types.ObjectId };
@Schema()
export class Student {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop()
  university: string;

  @Prop()
  degree: string;

  @Prop()
  graduationYear: number;

  @Prop()
  universityId: string;
}
export const StudentSchema = SchemaFactory.createForClass(Student);


export type RecruiterDocument = Recruiter & Document & { _id: Types.ObjectId };
@Schema()
export class Recruiter {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop()
  companyName: string;

  @Prop()
  position: string;

  @Prop({ default: false })
  approved: boolean;
}

export const RecruiterSchema = SchemaFactory.createForClass(Recruiter);