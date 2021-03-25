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
  GraphQLList,
} = graphql

// Dummy Data

const books = [
  {
    id: '1',
    name: 'C',
    genre: 'ABC',
    authorID: '1',
  },
  {
    id: '2',
    name: 'C++',
    genre: 'ABC',
    authorID: '2',
  },
  {
    id: '3',
    name: 'JS',
    genre: 'Python',
    authorID: '2',
  },
  {
    id: '4',
    name: 'JAVA',
    genre: 'ABC',
    authorID: '3',
  },
]

const authors = [
  {
    id: '1',
    name: 'author-1',
    age: 18,
    mobile_no: 7897979793,
    bookID: '1',
  },
  {
    id: '2',
    name: 'author-2',
    age: 12,
    mobile_no: 3897979793,
    bookID: '2',
  },
  {
    id: '3',
    name: 'author-3',
    age: 14,
    mobile_no: 3897979745,
    bookID: '3',
  },
]

// Define our book type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parents, args) {
        console.log(parents)
        return _.find(authors, { id: parents.authorID })
      },
    },
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
    book: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        console.log(parent)
        return _.filter(books, { authorID: parent.id })
      },
    },
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
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return books
      },
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
