import { Controller, Get, Post, Body, UseGuards, Query, Delete } from '@nestjs/common';
import { SiteService } from './site.service';
import { Site } from './models/site';
import { SiteType } from './models/site_type';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('sites')
@UseGuards(AuthGuard)
export class SiteController {

    constructor(private readonly siteService: SiteService) { }

    @Get()
    async allSite() {
        return {
            statusCode: 200,
            data: await this.siteService.findAllSite()
        }
    }

    @Get('/filter')
    async allSiteFilterType(@Query('site_type') site_id: number) {
        return {
            statusCode: 200,
            data: await this.siteService.findAllSiteFilterType(site_id)
        }
    }

    @Get('types')
    async allSiteType() {
        return {
            statusCode: 200,
            data: await this.siteService.findAllSiteType()
        }
    }

    @Post('/types')
    async createSiteType(@Body() body: SiteType) {
        return {
            statusCode: 200,
            data: await this.siteService.saveSiteType(body)
        };
    }

    @Post()
    async createSite(@Body() body: Partial<Site>) {
        return {
            statusCode: 200,
            data: await this.siteService.saveSite(body)
        };
    }

    @Post('/upload')
    async upload(@Body() body: Partial<Site>[]) {
        return {
            statusCode: 200,
            data: await this.siteService.saveSites(body)
        };
    }

    @Delete()
    async deleteSite(@Query('site_id') site_id: number) {
        await this.siteService.deleteSite(site_id);
        return {
            statusCode: 200,
        }
    }

}
