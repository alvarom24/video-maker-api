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

const courseModel = Mongoose.model('course', {
  title: String,
  videoUrl: String,
  question: String,
  answers: String,
  prompAt: String,
  prompValue: String,
});

const courseType = new GraphQLObjectType({
  name: 'course',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    videoUrl: { type: GraphQLString },
    question: {
      type: GraphQLString,
    },
    answers: { type: GraphQLString },
    prompAt: { type: GraphQLString },
    prompValue: { type: GraphQLString },
  },
});

const courseSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    fields: {
      allCourses: {
        type: GraphQLList(courseType),
        resolve: (root, args, context, info) => {
          return courseModel.find().exec();
        },
      },
      courseById: {
        type: courseType,
        args: {
          id: {
            type: GraphQLNonNull(GraphQLID),
          },
        },
        resolve: (root, args, context, info) => {
          return courseModel.findById(args.id).exec();
        },
      },
      courseByTitle: {
        type: courseType,
        args: {
          title: {
            type: GraphQLNonNull(GraphQLString),
          },
        },
        resolve: (root, args, context, info) => {
          return courseModel.findOne({ title: args.title }).exec();
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'mutation',
    fields: {
      insertCourse: {
        type: courseType,
        args: {
          title: { type: GraphQLNonNull(GraphQLString) },
          videoUrl: { type: GraphQLNonNull(GraphQLString) },
          question: {
            type: GraphQLNonNull(GraphQLString),
          },
          answers: { type: GraphQLNonNull(GraphQLString) },
          prompAt: { type: GraphQLString },
          prompValue: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          const course = new courseModel(args);
          return course.save();
        },
      },
      deleteCourse: {
        type: courseType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve: (root, args, context, info) => {
          return courseModel.findByIdAndRemove(args.id).exec();
        },
      },
    },
  }),
});

module.exports = courseSchema;
