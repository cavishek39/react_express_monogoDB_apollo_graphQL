const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

/**
 * Our middleware
 */
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
  })
)

app.listen('4000', () => {
  console.log('Listening...!')
})
