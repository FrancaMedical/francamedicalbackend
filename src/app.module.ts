import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsultaModule } from './consulta/consulta.module';
import { MedicoModule } from './medico/medico.module';
import { PacienteModule } from './paciente/paciente.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from './admin/admin.module';
import { FileModule } from './files/file.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    ConfigModule.forRoot(),
    PacienteModule,
    ConsultaModule,
    MedicoModule,
    AdminModule,
    AuthModule,
    FileModule,
    JwtModule,
  ],
})
export class AppModule {}
