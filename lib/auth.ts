import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up") || ctx.path.startsWith("/sign-in")) {
        if (ctx.headers?.get("x-admin-secret") !== process.env.ADMIN_SECRET) {
          throw new APIError("UNAUTHORIZED", {
            message: "you are not a good boy",
          });
        }
      }
    }),
  },
});

export type Session = typeof auth.$Infer.Session;
