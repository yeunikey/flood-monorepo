import { StreamableFile } from '@nestjs/common';
import { FileService } from './file.service';
export declare class ImageController {
    private readonly fileService;
    constructor(fileService: FileService);
    upload(file: Express.Multer.File): Promise<{
        statusCode: number;
        data: import("./entities/file.entity").File;
    }>;
    getImage(id: string): Promise<StreamableFile>;
}
