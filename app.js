const Express = require('express');
const ExpressGraphQl = require('express-graphql');
const Mongoose = require('mongoose');
const cors = require('cors');
const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql');

var app = Express();

Mongoose.connect('mongodb://localhost/T_videoMaker');

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

app.use(
  '/course',
  cors(),
  ExpressGraphQl({
    schema: courseSchema,
    graphiql: true,
  })
);

app.listen(3002, () => {
  console.log('listen at port :3002');
});
