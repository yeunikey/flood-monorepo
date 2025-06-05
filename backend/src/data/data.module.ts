import { Catalog } from "./entities/catalog.entity";
import { Category } from "./entities/category.entity";
import { DataController } from "./data.controller";
import { DataService } from "./data.service";
import { DataSource } from "./entities/data_source.entity";
import { DataValue } from "./entities/data_value.entity";
import { MethodType } from "./entities/method_type.entity";
import { Module } from "@nestjs/common";
import { Qcl } from "./entities/qcl.entity";
import { Site } from "./entities/site";
import { SiteType } from "./entities/site_type";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Unit } from "./entities/unit.entity";
import { Variable } from "./entities/variable.entity";

@Module({
    controllers: [DataController],
    providers: [DataService],
    imports: [TypeOrmModule.forFeature([
        Catalog,
        Category,
        DataSource,
        DataValue,
        MethodType,
        Qcl,
        SiteType,
        Site,
        Unit,
        Variable
    ])],

})
export class DataModule { }
