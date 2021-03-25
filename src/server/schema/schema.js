// Building the schema for the book and author
const _ = require('loadsh')
const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql

// Dummy Data

const books = [
  {
    name: 'C',
    genre: 'ABC',
    id: '1',
  },
  {
    name: 'C++',
    genre: 'ABC',
    id: '2',
  },
  {
    name: 'JAVA',
    genre: 'ABC',
    id: '3',
  },
]

// Define our book type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
})

// Define our author type
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    mobile_no: { type: GraphQLInt },
  }),
})

// Defining the root query

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    /**
     * this name 'book' is matter, because when we are gonna query for the book
     * the name should have to be exactly same.
     */
    book: {
      type: BookType,
      /**
       * args here we using because, when somebody in query for a book
       * if he/she want to fecth a book by it's 'id' on the parameter then
       * the args property will come into play.
       */
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from the db/ other source
        return _.find(books, { id: args.id })
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
