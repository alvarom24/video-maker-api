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
const courseSchema = require('./schemas/course');

var app = Express();

Mongoose.connect('mongodb://localhost/T_videoMaker');

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
