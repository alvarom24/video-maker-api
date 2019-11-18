const Mongoose = require('mongoose');
const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql');

const resultModel = Mongoose.model('result', {
  courseId: String,
  videoUrl: String,
  userAnswers: String,
  correctAnswers: String,
});

const resultType = new GraphQLObjectType({
  name: 'result',
  fields: {
    id: { type: GraphQLID },
    courseId: { type: GraphQLString },
    videoUrl: { type: GraphQLString },
    userAnswers: {
      type: GraphQLString,
    },
    correctAnswers: { type: GraphQLString },
  },
});

const resultSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    fields: {
      allResulst: {
        type: GraphQLList(resultType),
        resolve: (root, args, context, info) => {
          return resultModel.find().exec();
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'mutation',
    fields: {
      insertResult: {
        type: resultType,
        args: {
          courseId: { type: GraphQLNonNull(GraphQLString) },
          videoUrl: { type: GraphQLNonNull(GraphQLString) },
          userAnswers: {
            type: GraphQLNonNull(GraphQLString),
          },
          correctAnswers: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (root, args, context, info) => {
          const result = new resultModel(args);
          return result.save();
        },
      },
      deleteResult: {
        type: resultType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve: (root, args, context, info) => {
          return resultModel.findByIdAndRemove(args.id).exec();
        },
      },
    },
  }),
});

module.exports = resultSchema;
