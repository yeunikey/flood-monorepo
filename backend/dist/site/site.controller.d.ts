import { SiteService } from './site.service';
import { Site } from '../data/entities/site';
import { SiteType } from '../data/entities/site_type';
export declare class SiteController {
    private readonly siteService;
    constructor(siteService: SiteService);
    allSite(): Promise<{
        statusCode: number;
        data: Site[];
    }>;
    allSiteFilterType(site_id: number): Promise<{
        statusCode: number;
        data: Site[];
    }>;
    allSiteType(): Promise<{
        statusCode: number;
        data: SiteType[];
    }>;
    createSiteType(body: SiteType): Promise<{
        statusCode: number;
        data: Partial<SiteType> & SiteType;
    }>;
    createSite(body: Partial<Site>): Promise<{
        statusCode: number;
        data: Partial<Site> & Site;
    }>;
    upload(body: Partial<Site>[]): Promise<{
        statusCode: number;
        data: (Partial<Site> & Site)[];
    }>;
    deleteSite(site_id: number): Promise<{
        statusCode: number;
    }>;
}
