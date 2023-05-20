import type { User } from "@prisma/client";
import { writable } from "svelte/store";

const currentUser = writable({})

let edmundo: User = {
    id: 1,
    first_name: 'Edmundo',
    last_name: 'Ortega',
    email: 'ed.ortega@gmail.com'
}

currentUser.set(edmundo)