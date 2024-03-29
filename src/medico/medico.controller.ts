import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MedicoService } from './medico.service';
import { ParamId } from '../decorator/param-id.decorator';
import { CreateMedicoDTO } from './dto/medico.create.dto';
import { UpdateMedicoDTO } from './dto/medico.update.dto';
import { AuthMedicoGuard } from '../guards/auth.medico.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorator/role.decorator';
import { Role } from '../enums/role.enum';
import { ReturnMedicoDTO } from './dto/return-medico.dto';
import { AuthAdminGuard } from '../guards/auth.admin.guard';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  // @Roles(Role.Admin)
  // @UseGuards(AuthAdminGuard, RoleGuard)
  @Get()
  async getAll(): Promise<ReturnMedicoDTO[]> {
    return (await this.medicoService.getAll()).map(
      (medico) => new ReturnMedicoDTO(medico),
    );
  }

  @Roles(Role.Admin)
  @UseGuards(AuthAdminGuard, RoleGuard)
  @Get('admin/:id')
  async getIdWithAdmin(@ParamId() id: string): Promise<ReturnMedicoDTO> {
    return new ReturnMedicoDTO(await this.medicoService.getById(id));
  }

  // @Roles(Role.Admin)
  //   @UseGuards(AuthAdminGuard, RoleGuard)
  @Post()
  async create(@Body() data: CreateMedicoDTO) {
    return this.medicoService.create(data);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthAdminGuard, RoleGuard)
  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.medicoService.delete(id);
  }

  @Roles(Role.Medico)
  @UseGuards(AuthMedicoGuard, RoleGuard)
  @Get(':id')
  async getById(@ParamId() id: string): Promise<ReturnMedicoDTO> {
    return new ReturnMedicoDTO(await this.medicoService.getById(id));
  }

  @Roles(Role.Medico)
  @UseGuards(AuthMedicoGuard, RoleGuard)
  @Put(':id')
  async update(@ParamId() id: string, @Body() data: UpdateMedicoDTO) {
    return this.medicoService.update(id, data);
  }
}
