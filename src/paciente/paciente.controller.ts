import { Controller, Get, Post, Body, Put, Delete, UseGuards } from "@nestjs/common";
import { ParamId } from "../decorator/param-id.decorator";
import { CreatePacienteDTO } from "./dto/paciente.create.dto";
import { UpdatePacienteDTO } from "./dto/paciente.update.dto";
import { PacienteService } from "./paciente.service";
import { Roles } from "../decorator/role.decorator";
import { Role } from "../enums/role.enum";
import { AuthPacienteGuard } from "../guards/auth.paciente.guard";
import { RoleGuard } from "../guards/role.guard";
import { ReturnPacienteDTO } from "./dto/return-paciente.dto";

@Controller('pacientes')
export class PacienteController {
    constructor(private readonly pacienteService: PacienteService) {}

    @Roles(Role.Admin)
    //falta auth-guard-admin
    @Get()
    async getAll(): Promise<ReturnPacienteDTO[]>{
        return(
            await this.pacienteService.getAll()
        ).map((paciente) => new ReturnPacienteDTO(paciente))
    }

    @Roles(Role.Paciente)
    @UseGuards(AuthPacienteGuard, RoleGuard)
    @Get(':id')
    async getById(@ParamId() id: string): Promise<ReturnPacienteDTO>{
        return new ReturnPacienteDTO(
            await this.pacienteService.getById(id)
        )
    }

    @Post()
    async create(@Body() data: CreatePacienteDTO) {
        return this.pacienteService.create(data)
    }

    @Roles(Role.Admin)
    @Put(':id')
    async update(@ParamId() id: string,@Body() data: UpdatePacienteDTO) {
        return this.pacienteService.update(id, data)
    }

    @Roles(Role.Admin)
    @Delete(':id') 
    async delete(@ParamId() id: string) {
        return this.pacienteService.delete(id)
    }
}