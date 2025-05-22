import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Site } from "./models/site";
import { SiteType } from "./models/site_type";
import { SiteService } from "./site.service";
import { SiteController } from "./site.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Site, SiteType])],
    providers: [SiteService],
    controllers: [SiteController],
})
export class SiteModule { }
