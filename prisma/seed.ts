import { Family, PrismaClient, Task, User } from '@prisma/client'
import { faker } from '@faker-js/faker'

const client = new PrismaClient();

async function main() {
    // clear old data


    const numberOfFamilies = 5;
    const numberOfUsers = 10;
    const numberOfTasks = 20;

    // utility function to handle common relational id assignment
    const rando = (limit: number): number  => {
        return Math.floor(Math.random() * limit)
    }

    const families: Family[] = []
    const users: User[] = []
    const tasks: Task[] = []

    // periods
    const periods = [
        { id: 0, name: "2021-2022 Year"},
        { id: 1, name: "2022-2023 Year"}
    ]

    // categories
    const categories = [
        { id: 0, name: "Gardening"},
        { id: 1, name: "Teaching"},
        { id: 2, name: "Admin"},
        { id: 3, name: "Animals"},
        { id: 4, name: "Cleaning"},
    ]

    // families
    console.log('seeding '+numberOfFamilies+' families');
    for(let i = 0; i < numberOfFamilies; i++) {
        families.push({
            id: i,
            name: faker.name.lastName() + '-' + faker.name.lastName(),
            isActive: true,
        })
    }

    // users
    console.log('seeding '+numberOfUsers+' users');
    for(let i = 0; i < numberOfUsers; i++) {
        users.push({
            id: i,
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            familyId: rando(numberOfFamilies)
        })
    }

    console.log(users)

    // tasks
    console.log('seeding '+numberOfTasks+' tasks');
    for(let i = 0; i < numberOfTasks; i++) {
        var user: User = users[rando(numberOfUsers)];

        tasks.push({
            id: i,
            duration: 15 + Math.floor((Math.random() * 450) / 15) * 15,
            description: faker.lorem.sentence(),
            performedOn: faker.date.recent(),
            userId: user.id,
            familyId: user.familyId,
            taskCategoryId: rando(categories.length),
            periodId: 1
        })
    }
    console.log(tasks)

    // remove old data
    await client.task.deleteMany({});
    await client.user.deleteMany({});
    await client.family.deleteMany({});
    await client.taskCategory.deleteMany({});
    await client.period.deleteMany({}); 

    await client.period.createMany({ data: periods });
    await client.taskCategory.createMany({ data: categories });
    await client.family.createMany({ data: families });
    await client.user.createMany({ data: users });
    await client.task.createMany({ data: tasks });


}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async() => {
    await client.$disconnect();
})

