let mongoose = require('mongoose')
let Schema = mongoose.Schema

let Cupom = new Schema({
	titulo: String,
	desc: String,
	foto: String,
	promo: String,
	loja: String,
	categoria: String,
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
	local: String,
}, {versionKey:false, strict:false})

let UsuarioLoja = new Schema({
	loja: String,
	senha: String
}, {versionKey:false, strict:false})

let Usuario = new Schema({
	nome: String,
	email: String,
	senha: String,
	numero: String,
	cuponsUsados: [String],
	vantagensUsadas: [String]
}, {versionKey:false, strict:false})


module.exports = {
	Cupom: mongoose.model('cupons', Cupom),
	Loja: mongoose.model('lojas', Loja),
	Usuario: mongoose.model('usuarios', Usuario),
	Vantagem: mongoose.model('vantagens', Vantagem),
	UsuarioLoja: mongoose.model('userLojas', UsuarioLoja)
}