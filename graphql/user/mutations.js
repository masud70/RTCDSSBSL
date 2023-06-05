const { GraphQLString } = require("graphql");
const { UserType, CourseType } = require("./typeDef");
const bcrypt = require("bcrypt");
const db = require("../../models");

module.exports = {
    createUser: {
        type: UserType,
        args: {
            id: { type: GraphQLString },
            nameBn: { type: GraphQLString },
            nameEn: { type: GraphQLString },
            email: { type: GraphQLString },
            phone: { type: GraphQLString },
            designation: { type: GraphQLString },
            currentOffice: { type: GraphQLString },
            dob: { type: GraphQLString },
            currentOfficeJoinDate: { type: GraphQLString },
            dateOfPRL: { type: GraphQLString },
        },
        resolve: async (parent, args, context, info) => {
            args.password = bcrypt.hashSync("User@123", 10);
            const user = await db.User.create(args);
            return user;
        },
    },

    insertCourse: {
        type: CourseType,
        args: {
            UserId: { type: GraphQLString },
            courseName: { type: GraphQLString },
            startDate: { type: GraphQLString },
            endDate: { type: GraphQLString },
        },
        resolve: async (parent, args, ctx, info) => {
            const course = await db.Course.create({
                courseName: args.courseName,
                startDate: args.startDate,
                endDate: args.endDate,
                UserId: args.UserId,
            });

            console.log(course);
            return course;
        },
    },
};
