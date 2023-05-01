import { Controller, Get, Post, Delete, Body, Put, UseGuards } from "@nestjs/common";
import { MedicoService } from "./medico.service";
import { ParamId } from "../decorator/param-id.decorator";
import { CreateMedicoDTO } from "./dto/medico.create.dto";
import { UpdateMedicoDTO } from "./dto/medico.update.dto";
import { AuthGuard } from "../guards/auth.guard";
import { RoleGuard } from "../guards/role.guard";
import { Roles } from "../decorator/role.decorator";
import { Role } from "../enums/role.enum";


@Controller('medico')
export class MedicoController {
    constructor(private readonly medicoService: MedicoService) {}
    
    @Get()
    async getAll() {
        return this.medicoService.getAll()
    }

    @Roles(Role.Medico)
    @UseGuards(AuthGuard, RoleGuard)
    @Get(':id')
    async getById(@ParamId() id: string) {
        return this.medicoService.getById(id)
    }

    @Post()
    async create(@Body() data: CreateMedicoDTO) {
        return this.medicoService.create(data)
    }

    @Roles(Role.Medico)
    @UseGuards(AuthGuard, RoleGuard)
    @Put(':id')
    async update(@ParamId() id: string,@Body() data: UpdateMedicoDTO) {
        return this.medicoService.update(id, data)
    }

    @Delete(':id') 
    async delete(@ParamId() id: string) {
        return this.medicoService.delete(id)
    }
}