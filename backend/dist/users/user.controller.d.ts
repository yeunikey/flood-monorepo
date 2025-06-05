import { UserService } from "./user.service";
import { AuthRequest } from "src/types";
import { ImageService } from "src/image/image.service";
import { UserUpdateDto } from "./dto/user.dto";
export declare class UserController {
    private userService;
    private imageService;
    constructor(userService: UserService, imageService: ImageService);
    get(params: {
        id: number;
    }): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        data: {
            password: undefined;
            id: number;
            email: string;
            image: string;
        };
        message?: undefined;
    }>;
    delete(req: AuthRequest): Promise<{
        statusCode: number;
        message: string;
    } | {
        statusCode: number;
        message?: undefined;
    }>;
    update(req: AuthRequest, body: UserUpdateDto): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        message: string;
        data: {
            password: undefined;
            id: number;
            email: string;
            image: string;
        };
    }>;
}
