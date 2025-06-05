import { User } from 'src/users/models/user.entity';
export declare class AuthService {
    codeMap: Map<string, {
        code: number;
        user: User;
        timeout: NodeJS.Timeout;
    }>;
    mailMap: Map<string, {
        code: number;
        timeout: NodeJS.Timeout;
    }>;
    generateCode(): number;
}
