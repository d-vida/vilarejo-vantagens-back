let mongoose = require('mongoose')
let Schema = mongoose.Schema

let Cupom = new Schema({
	titulo: String,
	desc: String,
	promo: String,
	lojaId: String
}, {versionKey:false})

let Vantagem = new Schema({
	titulo: String,
	desc: String,
	promo: String,
	loja: String
}, {versionKey:false})

let Loja = new Schema({
	nome: String,
	logoUrl: String,
}, {versionKey:false})

let Usuario = new Schema({
	nome: String,
	email: String,
	senha: String,
	cuponsUsados: [String],
	vantagensUsadas: [String]
}, {versionKey:false})

module.exports = {
	Cupom: mongoose.model('cupons', Cupom),
	Loja: mongoose.model('lojas', Loja),
	Usuario: mongoose.model('usuarios', Usuario),
	Vantagem: mongoose.model('vantagens', Vantagem)
}