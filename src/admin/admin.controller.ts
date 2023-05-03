import { Controller, Get, Post, Delete, Put, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ParamId } from '../decorator/param-id.decorator';
import { CreateAdminDTO } from './dto/admin.create.dto';
import { UpdateAdminDTO } from './dto/admin.update.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get(':id')
    async getById(@ParamId() id: string) {
        return await this.adminService.getById(id)
    }

    @Post()
    async create(@Body() data: CreateAdminDTO){
        return await this.adminService.create(data)
    }

    @Put(':id')
    async update(@ParamId() id: string, @Body() data: UpdateAdminDTO){
        return await this.adminService.update(id, data)
    }

    @Delete(':id')
    async delete(@ParamId() id: string){
        return await this.adminService.delete(id)
    }
}
