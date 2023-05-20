import type { RequestHandler } from "./$types"
import prisma from "$lib/prisma"
import type { Family } from "@prisma/client"
import { json } from "@sveltejs/kit"

// PATCH
export const PATCH: RequestHandler = ( async (event) => {
    const { id, isActive } = await event.request.json()

    console.log(`found id of ${id} and isActive is: ${isActive}`)

    const family: Family = await prisma.family.update({
        where: { id: Number(id)},
        data: {
            isActive: isActive
        }
    })

    return json({success: true, family})
    //return new Response(json("hello"), options)

}) satisfies RequestHandler

export const DELETE: RequestHandler = (async (event) => {
    const {id} = await event.request.json()

    console.log(`Deleting family: ${id}`)

    const family: Family = await prisma.family.delete({
        where: { id: Number(id)}
    })

    return json({success: true, family})
})