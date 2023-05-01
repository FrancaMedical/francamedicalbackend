import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { NotAcceptableException, NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { CreatePacienteDTO } from "./dto/paciente.create.dto";
import { UpdatePacienteDTO } from "./dto/paciente.update.dto";
import { Password } from '../utils/random.password'
import { CPF } from "../utils/validate.cpf";

@Injectable()
export class PacienteService {
    constructor(@InjectModel('CreatePacienteDTO') private readonly pacienteModel: Model<CreatePacienteDTO>) { }

    async getAll() {
        return await this.pacienteModel.find().exec()
    }

    async getById(id: string) {
        await this.exists(id)
        return await this.pacienteModel.findById(id).exec()
    }

    async create(data: CreatePacienteDTO) {
        const password = new Password()
        const cpfvalid = new CPF()
        if (!cpfvalid.validation(data.cpf)) {
            throw new NotAcceptableException('CPF inválido.');
        }
        
        try {
            data.password = password.gerar()

            const createdNew = new this.pacienteModel(data);
            return await createdNew.save()
        } catch (error) {
            if(error.code === 11000){
                throw new NotAcceptableException('CPF já cadastrado.')
            }
            throw new NotAcceptableException(error)
        }
    }

    async update(id: string, data: UpdatePacienteDTO) {
        const cpfvalid = new CPF()
        if (!cpfvalid.validation(data.cpf)) {
            throw new NotAcceptableException('CPF inválido.');
        }
        try {
            await this.exists(id)
            await this.pacienteModel.updateOne({ _id: id }, data).exec();
    
            return this.getById(id)   
        } catch (error) {
            if(error.code === 11000){
                throw new NotAcceptableException('CPF já cadastrado.')
            }
            throw new NotAcceptableException(error)
        }
    }

    async delete(id: string) {
        await this.exists(id)
        return this.pacienteModel.deleteOne({ _id: id }).exec()
    }

    async exists(id: string) {
        if (!(await this.pacienteModel.count({ _id: id }))) {
            throw new NotFoundException('O usuário não existe.');
        }
    }
}