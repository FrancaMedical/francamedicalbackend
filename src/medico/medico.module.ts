import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MedicoSchema } from "../schemas/medico.schema";
import { MedicoController } from "./medico.controller";
import { MedicoService } from "./medico.service";

@Module({
    imports: [MongooseModule.forFeature([{name: 'CreateMedicoDTO', schema: MedicoSchema}])],
    controllers: [MedicoController],
    providers: [MedicoService]
})
export class MedicoModule {}