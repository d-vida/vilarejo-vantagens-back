let {gql} = require('apollo-server')

let typeDefs = gql`
	type Cupom {
		id: ID!
		titulo: String
		desc: String
		promo: String
		loja: String
	}
	
	type Vantagem {
		id: ID!
		titulo: String
		desc: String
		promo: String
		loja: String
	}
	
	type Loja {
		id: ID!
		nome: String
		logoUrl: String
	}
	
	type Usuario {
		id: ID!
		nome: String
		email: String
		senha: String
		cuponsUsados: String
		vantagensUsadas: String
	}
	
	type Query {
		cupons: [Cupom!]!
		lojas: [Loja!]!
		usuarios: [Usuario!]!
		vantagens: [Vantagem!]!
	}
`

module.exports = typeDefs