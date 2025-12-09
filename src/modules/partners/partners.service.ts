import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePartnerDto, UpdatePartnerDto } from './dto/partner.dto';

@Injectable()
export class PartnersService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreatePartnerDto) {
        return this.prisma.partner.create({
            data: dto,
        });
    }

    async findAll() {
        return this.prisma.partner.findMany();
    }

    async remove(id: number) {
        return this.prisma.partner.delete({
            where: { id },
        });
    }

    async update(id: number, dto: UpdatePartnerDto) {
        return this.prisma.partner.update({
            where: { id },
            data: dto,
        });
    }
}
