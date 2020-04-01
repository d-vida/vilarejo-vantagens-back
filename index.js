let {Cupom} = require('./models.js')

let mongoose = require('mongoose')
let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')

mongoose.connect(
	'mongodb+srv://admin:admin@vilarejo-9wp9p.gcp.mongodb.net/vilarejo?retryWrites=true&w=majority',
	{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:true}
)

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.listen(4000, () => {console.log('listening at 4000')})

/*************
	ENDPOINTS
*************/

app.get('/getCupons', async (req, res) => {
	try {
		let result = await Cupom.find().exec()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.get('/getCupom/:id', async (req, res) => {
	try {
		let result = await Cupom.findById(req.params.id).exec()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.post('/addCupom', async (req,res) => {
	try {
		let newCupom = new Cupom(req.body)
		let result = await newCupom.save({validateBeforeSave:false})
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.delete('/deleteCupom/:id', async (req,res) => {
	try{
		let result = await Cupom.deleteOne({_id: req.params.id}).exec()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.put('/updateCupom/:id', async (req,res) => {
	try {
		let result = await Cupom.updateOne({_id: req.params.id}, req.body)
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})