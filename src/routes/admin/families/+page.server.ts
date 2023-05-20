import prisma from '$lib/prisma'
import {fail, redirect } from '@sveltejs/kit'

import type { Actions, PageServerLoad } from "./$types";
import type { Family } from '@prisma/client';

/*
export const load = (async() => {
    const families: Family[] = await prisma.family.findMany()
    console.log(families)

    return { data: families}
}) satisfies PageServerLoad;
*/

export const load = ( async({fetch}) => {

    const getFamilies = async () => {
        const res = await fetch('/api/families')
        const data = await res.json()
        return data.families
    }
    
    return {
        families: getFamilies()
    }

}) satisfies PageServerLoad

export const actions = {
    create: async ({cookies, request}) => {
        const data = await request.formData();
        
        //const name = data.get('name');
        console.log(data)
        //const user = await db.getUser(email);
        //cookies.set('sessionid', await db.createSession(user));
        // validate the input
        let name = data.get('name')

        if(!name) {
            return fail(400, {name, missing: true})
        }
        if(typeof name != "string") {
            return fail(400, {incorrect: true})
        }
        // create the family
        try {
            const family = await prisma.family.create({
                data: {
                    name: data.get('name') as string,
                    isActive: true // automatically activate family upon creation
                }
            })
            return {
                success: true,
                family
            }
        } 
        catch {
            return { success: false, family: null } 
        }
        // check for uniqueness 
        // return the family
        

        throw redirect(303, `/admin/families`)
    }
} satisfies Actions