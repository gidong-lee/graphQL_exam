const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
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
      args: {limit: {type: GraphQLInt}},
      resolve(parentValue, args) {
        const {limit = 20} = args;
        return axios.get(`${SERVER_DOMAIN}/companies/${parentValue.id}/users?_limit=${limit}`)
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

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
        companyId: {type: GraphQLString}
      },
      resolve(parentValue, {firstName, age}) {
        return axios.post(`${SERVER_DOMAIN}/users`, {firstName, age})
          .then(res => res.data);

      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, {id}) {
        return axios.delete(`${SERVER_DOMAIN}/users/${id}`)
          .then(res => res.data);
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},
        companyId: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        return axios.patch(`${SERVER_DOMAIN}/users/${args.id}`, args)
          .then(res => res.data);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});