let Cupom = require('./models.js')

let Resolver = {
	Query: {
		cupons: async () => await Cupom.find()
	}
}

module.exports = Resolver