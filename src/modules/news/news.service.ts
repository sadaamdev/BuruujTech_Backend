import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNewsDto, UpdateNewsDto } from './dto/news.dto';

@Injectable()
export class NewsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateNewsDto) {
        return this.prisma.blogPost.create({
            data: dto,
        });
    }

    async findAll() {
        return this.prisma.blogPost.findMany();
    }

    async findOne(slug: string) {
        const post = await this.prisma.blogPost.findUnique({
            where: { slug },
        });
        if (!post) throw new NotFoundException('Post not found');
        return post;
    }

    async update(slug: string, dto: UpdateNewsDto) {
        return this.prisma.blogPost.update({
            where: { slug },
            data: dto,
        });
    }

    async remove(slug: string) {
        return this.prisma.blogPost.delete({
            where: { slug },
        });
    }
}
