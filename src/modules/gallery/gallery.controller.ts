import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/gallery.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
    constructor(private readonly galleryService: GalleryService) { }

    @Post()
    @ApiOperation({ summary: 'Add image to gallery' })
    create(@Body() dto: CreateGalleryDto) {
        return this.galleryService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all gallery images' })
    findAll() {
        return this.galleryService.findAll();
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete gallery image' })
    remove(@Param('id') id: string) {
        return this.galleryService.remove(+id);
    }
}
