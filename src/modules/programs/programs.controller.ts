import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto, UpdateProgramDto } from './dto/program.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Will implement guard next or use default

@ApiTags('Programs')
@Controller('programs')
export class ProgramsController {
    constructor(private readonly programsService: ProgramsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a program' })
    create(@Body() dto: CreateProgramDto) {
        return this.programsService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all programs' })
    findAll() {
        return this.programsService.findAll();
    }

    @Get(':slug')
    @ApiOperation({ summary: 'Get program by slug' })
    findOne(@Param('slug') slug: string) {
        return this.programsService.findOne(slug);
    }

    @Patch(':slug')
    @ApiOperation({ summary: 'Update program' })
    update(@Param('slug') slug: string, @Body() dto: UpdateProgramDto) {
        return this.programsService.update(slug, dto);
    }

    @Delete(':slug')
    @ApiOperation({ summary: 'Delete program' })
    remove(@Param('slug') slug: string) {
        return this.programsService.remove(slug);
    }
}
