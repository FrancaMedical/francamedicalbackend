import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { CreatePacienteDTO } from './dto/paciente.create.dto';
import { UpdatePacienteDTO } from './dto/paciente.update.dto';
import { Password } from '../utils/random.password';
import { MailerService } from '@nestjs-modules/mailer';
import { CPF } from '../utils/validate.cpf';

@Injectable()
export class PacienteService {
  constructor(
    @InjectModel('CreatePacienteDTO')
    private readonly pacienteModel: Model<CreatePacienteDTO>,
    private readonly mailer: MailerService,
  ) {}

  async getAll() {
    return await this.pacienteModel.find();
  }

  async getById(id: string) {
    await this.exists(id);
    return await this.pacienteModel.findById(id);
  }

  async create(data: CreatePacienteDTO) {
    const password = new Password();
    data.password = password.gerar();

    try {
      console.log(data.nome);
      console.log(data.password);
      console.log(process.env.EMAIL_TO_MAILER);
      await this.mailer.sendMail({
        subject: 'Senha para efetuar seu login',
        to: process.env.EMAIL_TO_MAILER,
        template: 'password',
        context: {
          nome: data.nome,
          password: data.password,
        },
      });
      console.log('aa');
      const createdNew = new this.pacienteModel(data);
      console.log('Created: ', createdNew);
      return await createdNew.save();
    } catch (error) {
      console.log(error);
      throw new NotAcceptableException(error);
    }
  }

  async update(id: string, data: UpdatePacienteDTO) {
    const cpfvalid = new CPF();
    if (!cpfvalid.validation(data.cpf)) {
      throw new NotAcceptableException('CPF inválido.');
    }
    try {
      await this.exists(id);
      await this.pacienteModel.updateOne({ _id: id }, data).exec();

      return this.getById(id);
    } catch (error) {
      if (error.code === 11000) {
        throw new NotAcceptableException('CPF já cadastrado.');
      }
      throw new NotAcceptableException(error);
    }
  }

  async delete(id: string) {
    await this.exists(id);
    return this.pacienteModel.deleteOne({ _id: id }).exec();
  }

  async exists(id: string) {
    if (!(await this.pacienteModel.count({ _id: id }))) {
      throw new NotFoundException('O usuário não existe.');
    }
  }
}
