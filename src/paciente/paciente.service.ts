import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePacienteDTO } from "./dto/paciente.create.dto";
import { UpdatePacienteDTO } from "./dto/paciente.update.dto";

@Injectable()
export class PacienteService {
    constructor(@InjectModel('CreatePacienteDTO') private readonly pacienteModel: Model<CreatePacienteDTO>) {}

    async getAll(){
        return await this.pacienteModel.find().exec()
    }

    async getById(id: string) {
        this.exists(id)
        return await this.pacienteModel.findById(id).exec()
    }

    async create(data: CreatePacienteDTO) {
        const createdNew = new this.pacienteModel(data);

        return await createdNew.save()
    }

    async update(id: string, data: UpdatePacienteDTO) {
        this.exists(id)
        await this.pacienteModel.updateOne({_id: id}, data).exec();

        return this.getById(id)
    }

    async delete(id: string) {
        this.exists(id)
        return this.pacienteModel.deleteOne({_id: id}).exec()
    }

    async exists(id: string) {
        if(!(await this.pacienteModel.count({_id: id})))
        throw new NotFoundException('O usuário não existe.');
    }
}