import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ParamId } from '../decorator/param-id.decorator';
import { CreateAdminDTO } from './dto/admin.create.dto';
import { UpdateAdminDTO } from './dto/admin.update.dto';
import { Roles } from '../decorator/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthAdminGuard } from '../guards/auth.admin.guard';
import { RoleGuard } from '../guards/role.guard';

// @Roles(Role.Admin)
// @UseGuards(AuthAdminGuard, RoleGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async getAll() {
    return await this.adminService.getAll();
  }

  @Get(':id')
  async getById(@ParamId() id: string) {
    return await this.adminService.getById(id);
  }

  @Post()
  async create(@Body() data: CreateAdminDTO) {
    return await this.adminService.create(data);
  }

  @Put(':id')
  async update(@ParamId() id: string, @Body() data: UpdateAdminDTO) {
    return await this.adminService.update(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return await this.adminService.delete(id);
  }
}
