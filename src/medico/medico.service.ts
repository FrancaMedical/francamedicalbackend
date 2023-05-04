import { NotFoundException, NotAcceptableException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateMedicoDTO } from "./dto/medico.create.dto";
import { UpdateMedicoDTO } from "./dto/medico.update.dto";
import * as bcrypt from 'bcrypt';
import { Model } from "mongoose";
import { CPF } from "../utils/validate.cpf";

@Injectable()
export class MedicoService {
    constructor(@InjectModel('CreateMedicoDTO') private readonly medicoModel: Model<CreateMedicoDTO>) { }

    async getAll() {
        return await this.medicoModel.find().exec()
    }

    async getById(id: string) {
        await this.exists(id)
        return await this.medicoModel.findById(id).exec()
    }

    async create(data: CreateMedicoDTO) {
        const cpfvalid = new CPF()
        const salt = await bcrypt.genSalt();
        if (!cpfvalid.validation(data.cpf)) {
            throw new NotAcceptableException('CPF inválido.');
        }
        try {
            data.password = await bcrypt.hash(data.password, salt);
            const createdNew = new this.medicoModel(data);

            return await createdNew.save()
        } catch (error) {
            if (error.code === 11000) {
                throw new NotAcceptableException('CPF já cadastrado.')
            }
            throw new NotAcceptableException(error)
        }
    }

    async update(id: string, data: UpdateMedicoDTO) {
        const cpfvalid = new CPF()
        const salt = await bcrypt.genSalt();
        if (!cpfvalid.validation(data.cpf)) {
            throw new NotAcceptableException('CPF inválido.');
        }
        try {
            await this.exists(id)
            data.password = await bcrypt.hash(data.password, salt);
            await this.medicoModel.updateOne({ _id: id }, data).exec();

            return this.getById(id)
        } catch (error) {
            if (error.code === 11000) {
                throw new NotAcceptableException('CPF já cadastrado.')
            }
            throw new NotAcceptableException(error)
        }
    }

    async delete(id: string) {
        await this.exists(id)
        return this.medicoModel.deleteOne({ _id: id }).exec()
    }

    async exists(id: string) {
        if (!(await this.medicoModel.count({ _id: id })))
            throw new NotFoundException('O usuário não existe.');
    }
}