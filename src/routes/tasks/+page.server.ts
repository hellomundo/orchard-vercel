import type { Actions } from "@sveltejs/kit";

export const actions = {
    create: async ({cookies, request}) => {
        const data = await request.formData();
        
        //const email = data.get('email');
        //const password = data.get('password');
        console.log(data)
        //const user = await db.getUser(email);
        //cookies.set('sessionid', await db.createSession(user));
        // validate the input
        // get the user id from session
        // find the family id
        // add the task
        

        return { success: true };
    },
    edit: async (event) => {

    },
    delete: async(event) => {

    }
} satisfies Actions