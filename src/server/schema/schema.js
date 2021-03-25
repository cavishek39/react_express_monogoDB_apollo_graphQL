// Building the schema for the book and author
const _ = require('loadsh')
const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
} = graphql

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

const authors = [
  {
    id: '1',
    name: 'ABC',
    age: 18,
    mobile_no: 7897979793,
  },
  {
    id: '2',
    name: 'ABC',
    age: 12,
    mobile_no: 3897979793,
  },
  {
    id: '3',
    name: 'ABC',
    age: 14,
    mobile_no: 3897979745,
  },
]

// Define our book type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
})

// Define our author type
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    mobile_no: { type: GraphQLFloat },
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
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from the db/ other source
        return _.find(books, { id: args.id })
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id })
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
