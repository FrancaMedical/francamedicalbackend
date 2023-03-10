import { Controller, Get, Post, Body, Put, Delete, Param } from "@nestjs/common";
import { ParamId } from "../decorator/param-id.decorator";
import { CreatePacienteDTO } from "./dto/paciente.create.dto";
import { UpdatePacienteDTO } from "./dto/paciente.update.dto";
import { PacienteService } from "./paciente.service";

@Controller('pacientes')
export class PacienteController {
    constructor(private readonly pacienteService: PacienteService) {}

    @Get()
    async getAll() {
        return this.pacienteService.getAll()
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.pacienteService.getById(id)
    }

    @Post()
    async create(@Body() data: CreatePacienteDTO) {
        return this.pacienteService.create(data)
    }

    @Put(':id')
    async update(@Param('id') id: string,@Body() data: UpdatePacienteDTO) {
        return this.pacienteService.update(id, data)
    }

    @Delete(':id') 
    async delete(@Param('id') id: string) {
        return this.pacienteService.delete(id)
    }
}