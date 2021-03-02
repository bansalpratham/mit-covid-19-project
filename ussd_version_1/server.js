const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
  res.send('USSD app by satyam <satyam.11808971@lpu.in>')
})

app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  if (text == '') {

      let response = `CON hello ${phoneNumber}
      Are you currently taking your medication as prescribed?
      1. Yes, I take it as prescribed every day
      2. I try, but I sometimes forget
      3. No, I stopped taking them`
      res.send(response)

  } else if (text == '1') {

      let response = `CON Do you still having problem?
      1. Yes, sometimes
      2. No`
      res.send(response)
  } else if (text == '1*1') {

      let response = `END We request you to answer few more questions`
      res.send(response)
  } else if (text == '1*2') {

      let response = `END Thank you for using our service`
      res.send(response)

  } else if (text == '2') {

      let response = `END In the last month, how often did you forget?
      1. Once
      2. Once a week
      3. More than twice a week
      4. Most days of the week`
      res.send(response)

  } else if (text == '3') {

      let response = `END Why?
      1. I ran out of medication to take
      2. I no longer need it
      3. I don’t want to
      4. I am healthy`
      res.send(response)

  } else {
      res.status(400).send('Bad request!')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
