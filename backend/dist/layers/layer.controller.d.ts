import { LayerService } from "./layer.service";
import { AuthRequest } from "src/types";
import { LayerCreateDto } from "./dto/layer-create.dto";
import { UserService } from "src/users/user.service";
import { DeepPartial } from "typeorm";
import { Layer } from "./entities/layer.entity";
export declare class LayerController {
    private layerService;
    private userService;
    constructor(layerService: LayerService, userService: UserService);
    getMyLayers({ user: { id } }: AuthRequest): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        data: Layer[];
        message?: undefined;
    }>;
    create({ user: { id } }: AuthRequest, body: LayerCreateDto): Promise<{
        statusCode: number;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        message: string;
        data: DeepPartial<Layer> & Layer;
    }>;
    delete({ user: { id } }: AuthRequest, layer_id: LayerCreateDto): Promise<{
        statusCode: number;
        message: string;
    } | {
        statusCode: number;
        message?: undefined;
    }>;
}
