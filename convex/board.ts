import { v } from "convex/values" // Importing Convex's value validation methods
import { mutation } from "./_generated/server" // Importing the mutation method from Convex's server utilities

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