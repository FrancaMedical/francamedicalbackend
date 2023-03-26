import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConsultaSchema } from "../schemas/consulta.schema";
import { ConsultaController } from "./consulta.controller";
import { ConsultaService } from "./consulta.service";

@Module({
    imports: [MongooseModule.forFeature([{name: 'CreatedConsultaDTO', schema: ConsultaSchema}])],
  controllers: [ConsultaController],
  providers: [ConsultaService]
})
export class ConsultaModule {}