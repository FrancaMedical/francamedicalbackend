import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateConsultaDTO } from "./dto/consulta.create.dto";
import { Model } from "mongoose";
import { UpdateConsultaDTO } from "./dto/consulta.update.dto";

@Injectable()
export class ConsultaService{
    constructor(@InjectModel('CreateConsultaDTO') private readonly consultaModel: Model<CreateConsultaDTO>) {}

    async getAll(){
        return await this.consultaModel.find().exec()
    }

    async getById(id: string) {
        this.exists(id)
        return await this.consultaModel.findById(id).exec()
    }

    async create(data: CreateConsultaDTO) {
        const createdNew = new this.consultaModel(data);

        return await createdNew.save()
    }

    async update(id: string, data: UpdateConsultaDTO) {
        this.exists(id)
        await this.consultaModel.updateOne({_id: id}, data).exec();

        return this.getById(id)
    }

    async delete(id: string) {
        this.exists(id)
        return this.consultaModel.deleteOne({_id: id}).exec()
    }

    async exists(id: string) {
        if(!(await this.consultaModel.count({_id: id})))
        throw new NotFoundException('A consulta não existe.');
    }
}