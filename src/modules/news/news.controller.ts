import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './dto/news.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('News')
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a news post' })
    create(@Body() dto: CreateNewsDto) {
        return this.newsService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all news' })
    findAll() {
        return this.newsService.findAll();
    }

    @Get(':slug')
    @ApiOperation({ summary: 'Get news post by slug' })
    findOne(@Param('slug') slug: string) {
        return this.newsService.findOne(slug);
    }

    @Patch(':slug')
    @ApiOperation({ summary: 'Update news post' })
    update(@Param('slug') slug: string, @Body() dto: UpdateNewsDto) {
        return this.newsService.update(slug, dto);
    }

    @Delete(':slug')
    @ApiOperation({ summary: 'Delete news post' })
    remove(@Param('slug') slug: string) {
        return this.newsService.remove(slug);
    }
}
