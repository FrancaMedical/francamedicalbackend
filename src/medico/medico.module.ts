import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MedicoSchema } from "../schemas/medico.schema";
import { MedicoController } from "./medico.controller";
import { MedicoService } from "./medico.service";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [MongooseModule.forFeature([{name: 'CreateMedicoDTO', schema: MedicoSchema}]), forwardRef(() => AuthModule)],
    controllers: [MedicoController],
    providers: [MedicoService],
    exports: [MedicoService]
})
export class MedicoModule {}