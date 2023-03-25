import * as mongoose from 'mongoose';

export const addressSchema = new mongoose.Schema({
    cep: String,
    rua: String,
    numero: String,
    bairro: String,
    cidade: String,
    estado: String
})

export const PacienteSchema = new mongoose.Schema({
    nome: String,
    cpf: String,
    dataNascimento: String,
    tel: Number,
    role: Number,
    endereco: [addressSchema]
})