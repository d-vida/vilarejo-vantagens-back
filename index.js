let {ApolloServer} = require('apollo-server')
let typeDefs = require('./server/schema.js')
let resolvers = require('./server/resolver.js')
let mongoose = require('mongoose')

mongoose.connect(
  'mongodb+srv://admin:admin@vilarejo-9wp9p.gcp.mongodb.net/test?retryWrites=true&w=majority',
  {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:true}
)
mongoose.connection.once('open', ()=>{
	let server = new ApolloServer({typeDefs, resolvers})
	server.listen(4001).then(({url})=>{console.log(`Apollo Server Connected at ${url}`)})
	console.log('> MongoDB Atlas Connected')
})