import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGalleryDto, UpdateGalleryDto } from './dto/gallery.dto';

@Injectable()
export class GalleryService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateGalleryDto) {
        return this.prisma.galleryItem.create({
            data: dto,
        });
    }

    async findAll() {
        return this.prisma.galleryItem.findMany();
    }

    async remove(id: number) {
        return this.prisma.galleryItem.delete({
            where: { id },
        });
    }
}
