import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './models/site';
import { SiteType } from './models/site_type';

@Injectable()
export class SiteService {
    constructor(
        @InjectRepository(Site)
        private readonly siteRepo: Repository<Site>,

        @InjectRepository(SiteType)
        private readonly siteTypeRepo: Repository<SiteType>,
    ) { }

    async findAllSite() {
        return await this.siteRepo.find({ relations: ['siteType'] });
    }

    async findAllSiteFilterType(site_type: number) {
        return await this.siteRepo.find({
            where: {
                siteType: {
                    id: site_type
                }
            },
        });
    }

    async findSiteById(id: number) {
        return await this.siteRepo.findOne({
            where: { id },
            relations: ['siteType'],
        });
    }

    async deleteSite(id: number) {
        return await this.siteRepo.delete(id);
    }

    async saveSite(data: Partial<Site>) {
        return await this.siteRepo.save(data);
    }

    async saveSites(data: Partial<Site>[]) {
        return await this.siteRepo.save(data);
    }

    async findAllSiteType() {
        return await this.siteTypeRepo.find();
    }

    async saveSiteType(data: Partial<SiteType>) {
        return await this.siteTypeRepo.save(data);
    }

}
