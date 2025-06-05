"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_guard_1 = require("./auth.guard");
const user_service_1 = require("../users/user.service");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../mailer/mail.service");
const bcrypt = require("bcryptjs");
let AuthController = class AuthController {
    authService;
    userService;
    jwtService;
    mailService;
    constructor(authService, userService, jwtService, mailService) {
        this.authService = authService;
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async profile(req) {
        const user = await this.userService.findById(req.user.id);
        return {
            statusCode: 200,
            data: {
                ...user,
                password: undefined
            },
        };
    }
    async register(body) {
        const contains = await this.userService.findByEmail(body.user.email);
        if (contains) {
            return {
                statusCode: 400,
                message: "Такой юзер уже существует"
            };
        }
        const code = this.authService.generateCode();
        const timeout = setTimeout(() => {
            this.authService.codeMap.delete(body.user.email);
        }, 3 * 60 * 1000);
        this.authService.codeMap.set(body.user.email, { code: code, user: body.user, timeout: timeout });
        await this.mailService.sendEmail(body.user.email, body.user.email, code);
        return {
            statusCode: 200,
        };
    }
    async confirm({ code, email }) {
        const contains = await this.userService.findByEmail(email);
        if (contains) {
            return {
                statusCode: 400,
                message: "Такой юзер уже существует"
            };
        }
        const codeRequest = this.authService.codeMap.get(email);
        if (!codeRequest) {
            return {
                statusCode: 400,
                message: "Нет заявки с кодом"
            };
        }
        if (codeRequest.code != code) {
            return {
                statusCode: 400,
                message: "Неправильный код"
            };
        }
        const password = await bcrypt.hash(codeRequest.user.password, 10);
        const user = await this.userService.save({
            ...codeRequest.user,
            password: password,
        });
        this.authService.codeMap.delete(email);
        const payload = {
            id: user.id,
        };
        return {
            statusCode: 200,
            data: {
                token: await this.jwtService.signAsync(payload),
                user: user
            }
        };
    }
    async login({ email, password }) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return {
                statusCode: 400,
                message: "Такого юзера не существует"
            };
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                statusCode: 400,
                message: "Неправильный пароль"
            };
        }
        const payload = {
            id: user.id,
        };
        return {
            statusCode: 200,
            data: {
                token: await this.jwtService.signAsync(payload),
                user: user
            }
        };
    }
    async changePassword({ user: { id } }, body) {
        const user = await this.userService.findById(id);
        if (!user) {
            return {
                statusCode: 400,
                message: "Пользователь не найден"
            };
        }
        if (body.newPassword != body.repeatPassword) {
            return {
                statusCode: 400,
                message: "Пароли не совпадают"
            };
        }
        const isMatch = await bcrypt.compare(body.oldPassword, user.password);
        if (!isMatch) {
            return {
                statusCode: 400,
                message: "Неправильный пароль"
            };
        }
        const password = await bcrypt.hash(body.newPassword, 10);
        user.password = password;
        await this.userService.save(user);
        return {
            statusCode: 200
        };
    }
    async changeMail({ user: { id } }, body) {
        const user = await this.userService.findById(id);
        if (!user) {
            return {
                statusCode: 400,
                message: "Такого пользователя не существует"
            };
        }
        const contains = await this.userService.findByEmail(body.newMail);
        if (contains) {
            return {
                statusCode: 400,
                message: "Пользователь с такой email уже существует"
            };
        }
        const code = this.authService.generateCode();
        const timeout = setTimeout(() => {
            this.authService.mailMap.delete(body.newMail);
        }, 3 * 60 * 1000);
        this.authService.mailMap.set(body.newMail, { code: code, timeout: timeout });
        await this.mailService.sendEmail(body.newMail, user.email, code);
        return {
            statusCode: 200,
        };
    }
    async confirmMail({ user: { id } }, { email, code }) {
        const user = await this.userService.findById(id);
        if (!user) {
            return {
                statusCode: 400,
                message: "Такого пользователя не существует"
            };
        }
        const contains = await this.userService.findByEmail(email);
        if (contains) {
            return {
                statusCode: 400,
                message: "Такого пользователя уже существует"
            };
        }
        const codeRequest = this.authService.mailMap.get(email);
        if (!codeRequest) {
            return {
                statusCode: 400,
                message: "Нет заявки с кодом"
            };
        }
        if (codeRequest.code != code) {
            return {
                statusCode: 400,
                message: "Неправильный код"
            };
        }
        const saved = await this.userService.save({
            ...user,
            email: email
        });
        this.authService.mailMap.delete(email);
        return {
            statusCode: 200,
            data: saved
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profile", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirm", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/change-mail'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changeMail", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/confirm-mail'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmMail", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map