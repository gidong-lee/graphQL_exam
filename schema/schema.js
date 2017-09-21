const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = graphql;

const SERVER_DOMAIN = 'http://localhost:3000';
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(`${SERVER_DOMAIN}/companies/${parentValue.id}/users`)
          .then(req => req.data);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User', // GraphQL Object Name(필수)
  fields: () => ({
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt},
    companyId: {type: GraphQLString},
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        console.log(parentValue, args);
        return axios.get(`${SERVER_DOMAIN}/companies/${parentValue.companyId}`)
          .then(req => req.data);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ( {
    user: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return axios.get(`${SERVER_DOMAIN}/users/${args.id}`)
          .then(req => req.data);
      }
    },
    company: {
      type: CompanyType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return axios.get(`${SERVER_DOMAIN}/companies/${args.id}`)
          .then(req => req.data);
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery
});