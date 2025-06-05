import { Repository } from 'typeorm';
import { File as SavedFile } from './entities/file.entity';
export declare class FileService {
    private fileRepo;
    constructor(fileRepo: Repository<SavedFile>);
    saveFile(file: Express.Multer.File): Promise<SavedFile>;
    getFile(id: string): Promise<SavedFile | null>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
