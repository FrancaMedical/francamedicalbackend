export class Password {
    gerar() {
        const newPass = []
        for(let i = 0; i < Number(process.env.LENGTH_PASSWORD); i++){
            const geraPassword = process.env.RANDOM_PASSWORD_PACIENT.charAt(Math.floor(Math.random() * process.env.RANDOM_PASSWORD_PACIENT.length))
            newPass.push(String(geraPassword));
        }

        return newPass.join('').toString()
    }
}


