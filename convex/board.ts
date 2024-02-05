import { v } from "convex/values" // Importing Convex's value validation methods
import { mutation, query } from "./_generated/server" // Importing the mutation method from Convex's server utilities

// Array of placeholder images to be randomly assigned to new boards
const images = [
    "/placeholders/1.svg",
    "/placeholders/2.svg",
    "/placeholders/3.svg",
    "/placeholders/4.svg",
    "/placeholders/5.svg",
    "/placeholders/6.svg",
    "/placeholders/7.svg",
    "/placeholders/8.svg",
    "/placeholders/9.svg",
    "/placeholders/10.svg",
]

// Define a mutation for creating a new board
export const create = mutation({
    args: {
        orgId: v.string(), // Validate that orgId is a string
        title: v.string(), // Validate that title is a string
    },
    handler: async (ctx, args) => {
        // Retrieve the identity of the currently authenticated user
        const identity = await ctx.auth.getUserIdentity();

        // If no user is authenticated, throw an error
        if (!identity) {
            throw new Error("Unauthorized")
        }

        // Select a random image from the images array
        const randomImage = images[Math.floor(Math.random() * images.length)]

        // Insert a new board record into the database
        const board = await ctx.db.insert("boards", {
            title: args.title, // Set the board's title
            orgId: args.orgId, // Set the organization ID
            authorId: identity.subject, // Set the author's user ID
            authorName: identity.name!, // Set the author's name
            imageUrl: randomImage // Assign a random image URL
        })

        // Return the newly created board
        return board
    }
})

export const remove = mutation({
    args: { id: v.id("boards") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const userId = identity.subject

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board", (q) =>
                q
                    .eq("userId", userId)
                    .eq("boardId", args.id)
            )
            .unique()

        if (existingFavorite) {
            await ctx.db.delete(existingFavorite._id)
        }

        await ctx.db.delete(args.id)
    }
})

export const update = mutation({
    args: { id: v.id("boards"), title: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }
        const title = args.title.trim();
        if (!title) {
            throw new Error("Title is required")
        }

        if (title.length > 60) {
            throw new Error("Title cannot be longer than 60 characters")
        }

        const board = await ctx.db.patch(args.id, {
            title: args.title,
        })

        return board
    }
})

export const favorite = mutation({
    args: { id: v.id("boards"), orgId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized")
        }
        const board = await ctx.db.get(args.id)

        if (!board) {
            throw new Error("Board not found")
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board", (q) =>
                q
                    .eq("userId", userId)
                    .eq("boardId", board._id)
            )
            .unique()

        if (existingFavorite) {
            throw new Error("Board already favorited");
        }

        await ctx.db.insert("userFavorites", {
            userId,
            boardId: board._id,
            orgId: args.orgId
        })

        return board
    }
})


export const unfavorite = mutation({
    args: { id: v.id("boards") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized")
        }
        const board = await ctx.db.get(args.id)

        if (!board) {
            throw new Error("Board not found")
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board", (q) =>
                q
                    .eq("userId", userId)
                    .eq("boardId", board._id)
            )
            .unique()

        if (!existingFavorite) {
            throw new Error("Board not favorited");
        }

        await ctx.db.delete(existingFavorite._id)

        return board
    }
})

export const get = query({
    args: { id: v.id("boards") },
    handler: async (ctx, args) => {
        const board = ctx.db.get(args.id);

        return board;
    }
})