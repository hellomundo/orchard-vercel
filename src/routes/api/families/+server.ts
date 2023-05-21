import prisma from "$lib/prisma"
import type { Family } from "@prisma/client"
import type { RequestHandler } from "@sveltejs/kit"

// GET
export const GET: RequestHandler = ( async (event) => {
    const families: Family[] = await prisma.family.findMany()

    return new Response(JSON.stringify({
        success: true,
        families: families
    }), {status: 200})
}) satisfies RequestHandler
