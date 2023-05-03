import { Controller, Get, Body, Post, Put, Delete, UseGuards } from "@nestjs/common";
import { ConsultaService } from "./consulta.service";
import { ParamId } from "../decorator/param-id.decorator";
import { CreateConsultaDTO } from "./dto/consulta.create.dto";
import { UpdateConsultaDTO } from "./dto/consulta.update.dto";
import { Roles } from "../decorator/role.decorator";
import { Role } from "../enums/role.enum";
import { AuthMedicoGuard } from "../guards/auth.medico.guard";
import { RoleGuard } from "../guards/role.guard";
import { AuthPacienteGuard } from "../guards/auth.paciente.guard";
import { ReturnConsultaDTO } from "./dto/return-consulta.dto";

@Controller('consulta')
export class ConsultaController {
    constructor(private readonly consultaService: ConsultaService) {}

    @Roles(Role.Medico)
    @UseGuards(AuthMedicoGuard, RoleGuard)
    @Get()
    async getAll(): Promise<ReturnConsultaDTO[]> {
        return (
            await this.consultaService.getAll()
        ).map((consulta) => new ReturnConsultaDTO(consulta))
    }

    @Roles(Role.Paciente)
    @UseGuards(AuthPacienteGuard, RoleGuard)
    @Get(':id')
    async getById(@ParamId() id: string): Promise<ReturnConsultaDTO> {
        return new ReturnConsultaDTO(
            await this.consultaService.getById(id)
        )
    }

    @Roles(Role.Medico)
    @UseGuards(AuthMedicoGuard, RoleGuard)
    @Post()
    async create(@Body() data: CreateConsultaDTO) {
        return this.consultaService.create(data)
    }
    
    @Roles(Role.Medico)
    @UseGuards(AuthMedicoGuard, RoleGuard)
    @Put(':id')
    async update(@ParamId() id: string,@Body() data: UpdateConsultaDTO) {
        return this.consultaService.update(id, data)
    }
    
    @Roles(Role.Medico)
    @UseGuards(AuthMedicoGuard, RoleGuard)    
    @Delete(':id') 
    async delete(@ParamId() id: string) {
        return this.consultaService.delete(id)
    }
}