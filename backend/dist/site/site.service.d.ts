import { Repository } from 'typeorm';
import { Site } from '../data/entities/site';
import { SiteType } from '../data/entities/site_type';
export declare class SiteService {
    private readonly siteRepo;
    private readonly siteTypeRepo;
    constructor(siteRepo: Repository<Site>, siteTypeRepo: Repository<SiteType>);
    findAllSite(): Promise<Site[]>;
    findAllSiteFilterType(site_type: number): Promise<Site[]>;
    findSiteById(id: number): Promise<Site | null>;
    deleteSite(id: number): Promise<import("typeorm").DeleteResult>;
    saveSite(data: Partial<Site>): Promise<Partial<Site> & Site>;
    saveSites(data: Partial<Site>[]): Promise<(Partial<Site> & Site)[]>;
    findAllSiteType(): Promise<SiteType[]>;
    saveSiteType(data: Partial<SiteType>): Promise<Partial<SiteType> & SiteType>;
}
