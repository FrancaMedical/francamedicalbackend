import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsultaModule } from './consulta/consult.module';
import { PacienteModule } from './paciente/paciente.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    PacienteModule,
    ConsultaModule
  ],
})
export class AppModule {}
