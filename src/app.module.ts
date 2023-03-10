import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PacienteModule } from './paciente/paciente.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://gabriel:rVbkSr2xD3DabNfp@cluster0.c4onnqj.mongodb.net/test'),
    ConfigModule.forRoot({envFilePath: ['.development.env', '.env'], isGlobal: true,}),
    PacienteModule
  ],
})
export class AppModule {}
