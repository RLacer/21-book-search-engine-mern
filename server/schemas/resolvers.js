const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // const userData = await User.findOne({ _id: context.user._id })
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
      console.log(context.user)
        return userData;
      }

      throw new AuthenticationError("Please Login");
    },
  },

  Mutation: {
    login: async(parent, { email, password }) => {
      const user = await User.findOne({
          email
      });

      if (!user) {
          throw new AuthenticationError("Please Signup");
      } 
      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
          throw new  AuthenticationError("Please use the correct password for this account")
      }
      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, { bookData }, context) => {
        if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookData } },
                { new: true }
            );
            return updatedUser;
        }
        throw new AuthenticationError("You Must Be Logged In")
    },
    removeBook: async (parent, args, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookID } } }, 
                { new: true }
            );
            return updatedUser;
        }
        throw new AuthenticationError("You Must Be Logged  In")
    },
  },
};

module.exports = resolvers;