import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    registerStudent: jest.fn(),
    registerRecruiter: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerStudent', () => {
    it('should register a student successfully', async () => {
      const dto = { name: 'Student', email: 'stu@test.com', password: 'pas', university: 'MIT', degree: 'CS', graduationYear: 2024, universityId: '123' };
      const response = { success: true, message: 'Student registered successfully', data: { userId: '1', studentId: '2' } };
      jest.spyOn(service, 'registerStudent').mockResolvedValue(response as any);
      
      const result = await controller.register(dto as any);
      
      expect(result).toStrictEqual(response);
      expect(service.registerStudent).toHaveBeenCalledWith(dto);
    });

    it('should throw BadRequestException when invalid payload is provided', async () => {
      await expect(controller.register(null as any)).rejects.toThrow(BadRequestException);
      expect(service.registerStudent).not.toHaveBeenCalled();
    });
  });

  describe('registerRecruiter', () => {
    it('should register a recruiter successfully', async () => {
      const dto = { name: 'Recruiter', email: 'req@test.com', password: 'pas', companyName: 'Corp', position: 'HR' };
      const response = { success: true, message: 'Recruiter registered successfully', data: { userId: '1', recruiterId: '2' } };
      jest.spyOn(service, 'registerRecruiter').mockResolvedValue(response as any);
      
      const result = await controller.registerRecruiter(dto as any);
      
      expect(result).toStrictEqual(response);
      expect(service.registerRecruiter).toHaveBeenCalledWith(dto);
    });

    it('should throw BadRequestException when invalid payload is provided', async () => {
      await expect(controller.registerRecruiter(null as any)).rejects.toThrow(BadRequestException);
      expect(service.registerRecruiter).not.toHaveBeenCalled();
    });
  });

  describe('registerAdmin', () => {
    it('should register an admin successfully', async () => {
      const dto = { name: 'Admin', email: 'admin@test.com', password: 'pas' };
      const response = { success: true, message: 'Admin registered successfully', data: { userId: '1' } };
      jest.spyOn(service, 'register').mockResolvedValue(response as any);
      
      const result = await controller.registerAdmin(dto as any);
      
      expect(result).toStrictEqual(response);
      expect(service.register).toHaveBeenCalledWith(dto);
    });

    it('should throw BadRequestException when invalid payload is provided', async () => {
      await expect(controller.registerAdmin(null as any)).rejects.toThrow(BadRequestException);
      expect(service.register).not.toHaveBeenCalled();
    });
  });
});

