import * as mongoose from "mongoose";

export const ConsultaSchema = new mongoose.Schema({
    nomePaciente: String,
    especialidade: String,
    dataConsulta: String,
    horario: String,
    descricao: String
})
