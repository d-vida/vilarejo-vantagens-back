let mongoose = require('mongoose')
let Schema = mongoose.Schema

let Cupom = new Schema({
	titulo: String,
	desc: String,
	promo: String,
	lojaId: String
})

let Vantagem = new Schema({
	titulo: String,
	desc: String,
	promo: String,
	loja: String
})

let Loja = new Schema({
	nome: String,
	logoUrl: String,
})

let Usuario = new Schema({
	nome: String,
	email: String,
	senha: String,
	cuponsUsados: [String],
	vantagensUsadas: [String]
})

module.exports = {
	Cupom: mongoose.model('cupons', Cupom),
	Loja: mongoose.model('lojas', Loja),
	Usuario: mongoose.model('usuarios', Usuario),
	Vantagem: mongoose.model('vantagens', Vantagem)
}