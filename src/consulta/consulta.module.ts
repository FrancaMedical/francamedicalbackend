import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConsultaSchema } from "../../schemas/consulta.schema";
import { ConsultaController } from "./consulta.controller";
import { ConsultaService } from "./consulta.service";
import { AuthModule } from "../auth/auth.module";
import { MedicoModule } from "../medico/medico.module";
import { PacienteModule } from "../paciente/paciente.module";

@Module({
    imports: [
      MongooseModule.forFeature([{name: 'CreateConsultaDTO', schema:ConsultaSchema}]), 
    forwardRef(()=> AuthModule), 
    MedicoModule,
    PacienteModule
  ],
  controllers: [ConsultaController],
  providers: [ConsultaService]
})
export class ConsultaModule {}