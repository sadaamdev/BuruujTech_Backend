import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProgramDto, UpdateProgramDto } from './dto/program.dto';

@Injectable()
export class ProgramsService {
    constructor(private prisma: PrismaService) { }

    async create(createProgramDto: CreateProgramDto) {
        return this.prisma.program.create({
            data: createProgramDto,
        });
    }

    async findAll() {
        return this.prisma.program.findMany();
    }

    async findOne(slug: string) {
        return this.prisma.program.findUnique({
            where: { slug },
        });
    }

    async update(slug: string, updateProgramDto: UpdateProgramDto) {
        return this.prisma.program.update({
            where: { slug },
            data: updateProgramDto,
        });
    }

    async remove(slug: string) {
        return this.prisma.program.delete({
            where: { slug },
        });
    }
}
