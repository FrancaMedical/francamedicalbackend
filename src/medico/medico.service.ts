import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateMedicoDTO } from "./dto/medico.create.dto";
import { UpdateMedicoDTO } from "./dto/medico.update.dto";
import * as bcrypt from 'bcrypt';
import { Model } from "mongoose";

@Injectable()
export class MedicoService {
    constructor(@InjectModel('CreateMedicoDTO') private readonly medicoModel: Model<CreateMedicoDTO>) {}

    async getAll(){
        return await this.medicoModel.find().exec()
    }

    async getById(id: string) {
        this.exists(id)
        return await this.medicoModel.findById(id).exec()
    }

    async create(data: CreateMedicoDTO) {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        
        const createdNew = new this.medicoModel(data);

        return await createdNew.save()
    }

    async update(id: string, data: UpdateMedicoDTO) {
        this.exists(id)
        await this.medicoModel.updateOne({_id: id}, data).exec();

        return this.getById(id)
    }

    async delete(id: string) {
        this.exists(id)
        return this.medicoModel.deleteOne({_id: id}).exec()
    }

    async exists(id: string) {
        if(!(await this.medicoModel.count({_id: id})))
        throw new NotFoundException('O usuário não existe.');
    }
}