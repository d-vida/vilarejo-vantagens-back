const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')

mongoose.connect(
  'mongodb+srv://admin:admin@vilarejo-9wp9p.gcp.mongodb.net/test?retryWrites=true&w=majority',
  {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:true}
)
mongoose.connection.once('open', ()=>{console.log('> MongoDB Atlas Connected')})

// let server = new ApolloServer()
// server.listen(4001).then(()=>{console.log('Apollo Server Connected')})