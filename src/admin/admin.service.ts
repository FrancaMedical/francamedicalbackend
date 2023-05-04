import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDTO } from './dto/admin.create.dto';
import { CPF } from '../utils/validate.cpf';
import * as bcrypt from 'bcrypt';
import { UpdateAdminDTO } from './dto/admin.update.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel('CreateAdminDTO') private readonly adminModel: Model<CreateAdminDTO>
    ) {}
    async getAll() {
        return await this.adminModel.find()
    }

    async getById(id: string) {
        await this.exists(id)
        return await this.adminModel.findById(id)
    }

    async create(data: CreateAdminDTO) {
        const cpfvalid = new CPF()
        const salt = await bcrypt.genSalt();
        if (!cpfvalid.validation(data.cpf)) {
            throw new NotAcceptableException('CPF inválido.');
        }
        try {
            data.password = await bcrypt.hash(data.password, salt);
            const createdNew = new this.adminModel(data);

            return await createdNew.save()
        } catch (error) {
            if (error.code === 11000) {
                throw new NotAcceptableException('CPF já cadastrado.')
            }
            throw new NotAcceptableException(error)
        }
    }

    async update(id: string, data: UpdateAdminDTO) {
        const cpfvalid = new CPF();
        const salt = await bcrypt.genSalt();
        if (!cpfvalid.validation(data.cpf)) {
            throw new NotAcceptableException('CPF inválido.');
        }
        
        try {
            await this.exists(id)

            data.password = await bcrypt.hash(data.password, salt);
            await this.adminModel.updateOne({_id: id}, data).exec()
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
        return await this.adminModel.deleteOne({_id: id})
    }

    async exists(id: string) {
        if (!(await this.adminModel.count({ _id: id })))
            throw new NotFoundException('O usuário não existe.');
    }
}
