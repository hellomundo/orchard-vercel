import prisma from '$lib/prisma'
import {fail, redirect } from '@sveltejs/kit'

import type { Actions, PageServerLoad } from "./$types";
import type { Family } from '@prisma/client';

export const load = (async({ params: { id }}) => {
    const family = await prisma.family.findUnique({
        where: { id: Number(id) }
    })

    return { family }
}) satisfies PageServerLoad;

export const actions = {
    edit: async ({ params: { id }}) => {
        const family: Family = await prisma.family.update({
            where: { id: Number(id)},
            data: {
                name: "bob"
            }
        })

        return family
    },
} satisfies Actions