import { User } from "src/users/models/user.entity";
import { DeepPartial, Repository } from "typeorm";
import { Layer } from "./entities/layer.entity";
import { FileService } from "src/file/file.service";
export declare class LayerService {
    private layerRepository;
    private fileService;
    constructor(layerRepository: Repository<Layer>, fileService: FileService);
    findAllByUser(user: User): Promise<Layer[]>;
    findById(id: number): Promise<Layer | null>;
    save(layer: DeepPartial<Layer>): Promise<DeepPartial<Layer> & Layer>;
    delete(layer: Layer): Promise<Layer>;
}
