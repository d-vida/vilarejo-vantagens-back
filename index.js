let {ApolloServer} = require('apollo-server')
let typeDefs = require('./server/schema.js')
let resolvers = require('./server/resolvers.js')
let mongoose = require('mongoose')

mongoose.connect(
  'mongodb+srv://admin:admin@vilarejo-9wp9p.gcp.mongodb.net/vilarejo?retryWrites=true&w=majority',
  {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:true}
)
mongoose.connection.once('open', ()=>{
	console.log('> MongoDB Atlas Connected')
})

let server = new ApolloServer({typeDefs, resolvers})
server.listen(4001).then(({url})=>{console.log(`Apollo Server Connected at ${url}`)})