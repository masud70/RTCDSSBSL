const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
} = require("graphql");

module.exports = {
    UserType: new GraphQLObjectType({
        name: "User",
        fields: () => ({
            slNo: { type: GraphQLInt },
            id: { type: GraphQLString },
            nameBn: { type: GraphQLString },
            nameEn: { type: GraphQLString },
            email: { type: GraphQLString },
            phone: { type: GraphQLString },
            designation: { type: GraphQLString },
            currentOffice: { type: GraphQLString },
            dob: { type: GraphQLString },
            avatar: { type: GraphQLString },
            currentOfficeJoinDate: { type: GraphQLString },
            dateOfPRL: { type: GraphQLString },
            role: { type: GraphQLString },
            Course: { type: module.exports.CourseType },
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString },
        }),
    }),

    LoginType: new GraphQLObjectType({
        name: "Login",
        fields: () => ({
            token: { type: GraphQLString },
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString },
            user: { type: module.exports.UserType },
        }),
    }),

    CourseType: new GraphQLObjectType({
        name: "Course",
        fields: () => ({
            id: { type: GraphQLString },
            UserId: { type: GraphQLString },
            courseName: { type: GraphQLString },
            startDate: { type: GraphQLString },
            endDate: { type: GraphQLString },
            status: { type: GraphQLString },
            message: { type: GraphQLString },
        }),
    }),
};
