import * as mongoose from "mongoose";

export const ConsultaSchema = new mongoose.Schema({
    nomePaciente: {
        type: String,
        required: true
    },
    especialidade: {
        type: String,
        required: true
    },
    dataConsulta: {
        type: String,
        required: true
    },
    horario: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    }
})
