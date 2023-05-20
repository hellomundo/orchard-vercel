<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import type { Family } from "@prisma/client";
    import type { ActionData, PageData } from "./$types";
    import { Alert, Button, Input, Label, Modal, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
  import UserRow from "../../../components/UserRow.svelte";
   
    export let form: ActionData;
    export let data: PageData;
    let searchQuery: string = "";
    let showModal: boolean = false;
    let familyToDelete: Number | null = null;
    let filteredFamilies: Family[] = [];

    async function activate(id: Number) {
        //const id = event.target.value
        console.log("activating family: "+id)
        const result = await fetch(`/admin/families/${id}`, { 
            method: 'PATCH',
            body: JSON.stringify({
                id: id,
                isActive: true
            })
            // start spinner
        })
        let res = await result.json()
        console.log(res)
        invalidateAll()

    }

    async function deactivate(id: Number) {
        //const id = event.target.value
        console.log("deactivating family: "+id)
        const result = await fetch(`/admin/families/${id}`, { 
            method: 'PATCH',
            body: JSON.stringify({
                id: id,
                isActive: false
            })
        })
                    //location.reload()
        let res = await result.json()
        console.log(`Deactivated ${res}`)
        invalidateAll()

    }
    function openModal(id: Number) {
        // pop up are you sure
        //const id = event.target.value

        //window.alert(`are you sure you want to delete family number ${id}?`)
        showModal = true
        familyToDelete = id
    }

    function closeModal() {
        showModal = false
        familyToDelete = null
    }

    async function confirmDelete() {
        let id = familyToDelete
        console.log("confirming delete")
        const result = await fetch(`/admin/families/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({
                id: id
            })
        })

        let res = await result.json()
        if(res.success) {
            console.log(`Deleted family: ${res.family.name}`)
            showModal = false
            familyToDelete = null
            invalidateAll()
        }
    }

    function pauseRow(n: Number) {
        // select row
        // change backround color to gray
        // select buttons in row
        // disable buttons
    }

    function resumeRow(n: Number) {
        // select row
        // change background color to white
        // select buttons in row
        // enable buttons
    }

    $: {
        console.log(searchQuery);
        // filter families
        if(searchQuery) {
            // filter to match
            filteredFamilies = data.families.filter((fam: Family) => {
                return fam.name.toLowerCase().includes(searchQuery.toLowerCase())
            })
        } else {
            filteredFamilies = [...data.families]; // show all families
        }
    }


</script>

<div class="p-8">
    <h1>Families at Orchard</h1>
    <form method="POST" action="/admin/families?/create">
        <Label for="name" class="mb-2">Family Name:</Label>
            <Input type="text" name="name" id="name" placeholder="Family Name" required  />
        <Button type="submit">Submit</Button>
    </form>
    {#if form?.success}
    <Alert>
        {#if form?.family}
        <span class="font-medium">The {form?.family.name} family was added.</span>
        {:else}
        <span class="font-medium">Couldn't add the family.</span>
        {/if}
    </Alert>
    {/if}

    <div>
        <Label for="search">Search</Label>
        <Input type="text"id="search" placeholder="Search families" bind:value={searchQuery} />
    </div>

    <Table>
        <TableHead>
            <TableHeadCell>Family Name</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Created</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each filteredFamilies as family }
            <UserRow {family} on:clickActivate={() => {activate(family.id)}} on:clickDeactivate={() => {deactivate(family.id)}} on:clickDelete={() => {openModal(family.id)}}/>
            <!-- <TableBodyRow id="{`f${family.id}`}">
                <TableBodyCell>{family.name}</TableBodyCell>
                <TableBodyCell>{family.id}</TableBodyCell>
                <TableBodyCell></TableBodyCell>
                <TableBodyCell>
                    {#if family.isActive}
                    <Button on:click="{() => deactivate(family.id)}" outline={true} class="!p-2">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8518 11.9016 21.8517 12.0987 21.8231 12.2236C21.7849 12.3899 21.7164 12.4985 21.5792 12.7156C21.2793 13.1901 20.8222 13.8571 20.2165 14.5805M6.72432 6.71504C4.56225 8.1817 3.09445 10.2194 2.42111 11.2853C2.28428 11.5019 2.21587 11.6102 2.17774 11.7765C2.1491 11.9014 2.14909 12.0984 2.17771 12.2234C2.21583 12.3897 2.28393 12.4975 2.42013 12.7132C3.54554 14.4952 6.89541 19 12.0004 19C14.0588 19 15.8319 18.2676 17.2888 17.2766M3.00042 3L21.0004 21M9.8791 9.87868C9.3362 10.4216 9.00042 11.1716 9.00042 12C9.00042 13.6569 10.3436 15 12.0004 15C12.8288 15 13.5788 14.6642 14.1217 14.1213" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Button>
                    {:else}
                    <Button on:click="{() => activate(family.id)}" outline={true} class="!p-2">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Button>
                    {/if}
                    <Button on:click="{() => openModal(family.id)}" outline={true} class="!p-2"><svg class="w-5 h-5" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.33606 3.14838H15.3361M3.33606 6.14838H21.3361M19.3361 6.14838L18.6348 16.6677C18.5296 18.2459 18.4769 19.035 18.1361 19.6334C17.836 20.1602 17.3833 20.5837 16.8377 20.8481C16.218 21.1484 15.4272 21.1484 13.8454 21.1484H10.8267C9.24497 21.1484 8.45409 21.1484 7.8344 20.8481C7.28882 20.5837 6.83615 20.1602 6.53604 19.6334C6.19517 19.035 6.14256 18.2459 6.03735 16.6677L5.33606 6.14838M10.3361 10.6484V15.6484M14.3361 10.6484V15.6484" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </Button>
                </TableBodyCell>
            </TableBodyRow> -->
            {/each}
        </TableBody>
    </Table>
    <Modal bind:open={showModal} size="xs">
        <div class="text-center">
            <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this family?</h3>
            <Button on:click={confirmDelete} color="red" class="mr-2">Yes, I'm sure</Button>
            <Button on:click={() => showModal = false} color='alternative'>No, cancel</Button>
        </div>
      </Modal>
</div>