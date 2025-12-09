import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto, UpdatePartnerDto } from './dto/partner.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
    constructor(private readonly partnersService: PartnersService) { }

    @Post()
    @ApiOperation({ summary: 'Add a partner' })
    create(@Body() dto: CreatePartnerDto) {
        return this.partnersService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all partners' })
    findAll() {
        return this.partnersService.findAll();
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update partner' })
    update(@Param('id') id: string, @Body() dto: UpdatePartnerDto) {
        return this.partnersService.update(+id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove partner' })
    remove(@Param('id') id: string) {
        return this.partnersService.remove(+id);
    }
}
