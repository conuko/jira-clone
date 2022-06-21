import prisma from "../lib/prisma";

export const resolvers = {
  Query: {
    tasks: async (
      _parent: any,
      args: any,
      ctx: { prisma: { task: { findMany: () => any } } }
    ) => await ctx.prisma.task.findMany(),
  },
};
