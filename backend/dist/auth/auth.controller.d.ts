import { AuthService } from './auth.service';
import { RegisterDto, ConfirmDto, LoginDto, ChangePasswordDto, ChangeMailDto } from './dto/auth.dto';
import { UserService } from 'src/users/user.service';
import { AuthRequest } from 'src/types';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mailer/mail.service';
export declare class AuthController {
    private authService;
    private userService;
    private jwtService;
    private mailService;
    constructor(authService: AuthService, userService: UserService, jwtService: JwtService, mailService: MailService);
    profile(req: AuthRequest): Promise<{
        statusCode: number;
        data: {
            password: undefined;
            id?: number | undefined;
            email?: string | undefined;
            image?: string | undefined;
        };
    }>;
    register(body: RegisterDto): Promise<{
        statusCode: number;
        message: string;
    } | {
        statusCode: number;
        message?: undefined;
    }>;
    confirm({ code, email }: ConfirmDto): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        data: {
            token: string;
            user: import("../users/models/user.entity").User;
        };
        message?: undefined;
    }>;
    login({ email, password }: LoginDto): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        data: {
            token: string;
            user: import("../users/models/user.entity").User;
        };
        message?: undefined;
    }>;
    changePassword({ user: { id } }: AuthRequest, body: ChangePasswordDto): Promise<{
        statusCode: number;
        message: string;
    } | {
        statusCode: number;
        message?: undefined;
    }>;
    changeMail({ user: { id } }: AuthRequest, body: ChangeMailDto): Promise<{
        statusCode: number;
        message: string;
    } | {
        statusCode: number;
        message?: undefined;
    }>;
    confirmMail({ user: { id } }: AuthRequest, { email, code }: ConfirmDto): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        data: import("../users/models/user.entity").User;
        message?: undefined;
    }>;
}
