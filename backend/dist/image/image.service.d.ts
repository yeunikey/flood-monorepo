import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
export declare class ImageService {
    private imageRepo;
    constructor(imageRepo: Repository<Image>);
    saveImage(file: Express.Multer.File): Promise<Image>;
    getImage(id: string): Promise<Image | null>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
