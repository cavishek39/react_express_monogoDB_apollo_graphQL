const { clients, projects } = require('../sampleData')

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require('graphql')

//Client type

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
})

//Project type

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent, args) => {
        return clients.find((c) => c.id === parent.clientId)
      },
    },
  }),
})

// Root Query

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    clients: {
      type: GraphQLList(ClientType),
      resolve: (parent, args) => {
        return clients
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return clients.find((c) => c.id == args.id)
      },
    },
    projects: {
      type: GraphQLList(ProjectType),
      resolve: (parent, args) => {
        return projects
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return projects.find((p) => p.id === args.id)
      },
    },
  }),
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
