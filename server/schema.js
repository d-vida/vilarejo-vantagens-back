let {gql} = require('apollo-server')

let typeDefs = gql`
	type Cupom {
		_id: ID!
		titulo: String
		desc: String
		promo: String
	}
	
	type Query {
		cupons: [Cupom]
	}
`

module.exports = typeDefs