let {Cupom, Loja, Usuario, Vantagem} = require('./models.js')

let Resolver = {
	Query: {
		cupons: () => Cupom.find({}),
		lojas: () => Loja.find({}),
		usuarios: () => Usuario.find({}),
		vantagens: () => Vantagem.find({})
	},
	
	Mutation: {
		addCupom: (root, args) => {
			return new Cupom(args).save()
		}
	}
}

module.exports = Resolver