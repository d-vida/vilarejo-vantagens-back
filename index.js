let {Cupom} = require('./models.js')

let mongoose = require('mongoose')
let express = require('express')
let bodyParser = require('body-parser')

mongoose.connect(
	'mongodb+srv://admin:admin@vilarejo-9wp9p.gcp.mongodb.net/vilarejo?retryWrites=true&w=majority',
	{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:true}
)

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.listen(4000, () => {
	console.log('listening at 4000')
})

// endpoints
app.get('/cupons', async (req, res) => {
	let result = await Cupom.find().exec()
	res.send(result)
})

app.post('/addCupom', async (req,res) => {
	try {
		let newCupom = new Cupom(req.body)
		let result = await newCupom.save()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.delete('/deleteCupom/:id', async (req,res) => {
	let result = Cupom.deleteOne({_id: req.params.id}).exec()
	res.send(result)
})