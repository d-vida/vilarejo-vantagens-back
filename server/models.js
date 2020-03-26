let mongoose = require('mongoose')
let Schema = mongoose.Schema

let Cupom = new Schema({
	_id: String,
	titulo: String,
	desc: String,
	promo: String
})

module.exports = mongoose.model('cupons', Cupom)