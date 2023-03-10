import * as mongoose from 'mongoose';

export const PacienteSchema = new mongoose.Schema({
    nome: String,
    email: String,
    tel: Number,
    cpf: String
})