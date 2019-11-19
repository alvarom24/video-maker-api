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

const resultModel = Mongoose.model('result', {
  courseId: String,
  user: String,
  videoUrl: String,
  userAnswers: String,
  correctAnswers: String,
});

const resultType = new GraphQLObjectType({
  name: 'result',
  fields: {
    id: { type: GraphQLID },
    courseId: { type: GraphQLString },
    user: { type: GraphQLString },
    videoUrl: { type: GraphQLString },
    userAnswers: {
      type: GraphQLString,
    },
    correctAnswers: { type: GraphQLString },
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
      allResults: {
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
      insertResult: {
        type: resultType,
        args: {
          courseId: { type: GraphQLNonNull(GraphQLString) },
          user: { type: GraphQLNonNull(GraphQLString) },
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
    },
  }),
});

module.exports = courseSchema;
