import { Controller, Get, Body, Post, Put, Delete } from "@nestjs/common";
import { ConsultaService } from "./consulta.service";
import { ParamId } from "../decorator/param-id.decorator";
import { CreateConsultaDTO } from "./dto/consulta.create.dto";
import { UpdateConsultaDTO } from "./dto/consulta.update.dto";

@Controller('consulta')
export class ConsultaController {
    constructor(private readonly consultaService: ConsultaService) {}

    @Get()
    async getAll() {
        return this.consultaService.getAll()
    }

    @Get(':id')
    async getById(@ParamId() id: string) {
        return this.consultaService.getById(id)
    }

    @Post()
    async create(@Body() data: CreateConsultaDTO) {
        return this.consultaService.create(data)
    }

    @Put(':id')
    async update(@ParamId() id: string,@Body() data: UpdateConsultaDTO) {
        return this.consultaService.update(id, data)
    }

    @Delete(':id') 
    async delete(@ParamId() id: string) {
        return this.consultaService.delete(id)
    }
}