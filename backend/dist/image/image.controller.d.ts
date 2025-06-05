import { StreamableFile } from '@nestjs/common';
import { ImageService } from './image.service';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    upload(file: Express.Multer.File): Promise<{
        statusCode: number;
        data: import("./entities/image.entity").Image;
    }>;
    getImage(id: string): Promise<StreamableFile>;
}
