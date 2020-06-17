let mongoose = require('mongoose')
let Schema = mongoose.Schema

let Cupom = new Schema({
	titulo: String,
	desc: String,
	foto: String,
	promo: String,
	loja: String,
	qrcode: String
}, {versionKey:false, strict:false})

let Vantagem = new Schema({
	titulo: String,
	desc: String,
	promo: String,
	loja: String
}, {versionKey:false, strict:false})

let Loja = new Schema({
	nome: String,
	logo: String,
}, {versionKey:false, strict:false})

let Usuario = new Schema({
	nome: String,
	email: String,
	senha: String,
	cuponsUsados: [String],
	vantagensUsadas: [String]
}, {versionKey:false, strict:false})


module.exports = {
	Cupom: mongoose.model('cupons', Cupom),
	Loja: mongoose.model('lojas', Loja),
	Usuario: mongoose.model('usuarios', Usuario),
	Vantagem: mongoose.model('vantagens', Vantagem)
}