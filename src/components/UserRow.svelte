<script lang="ts">
    import type { Family } from "@prisma/client";
  import { Button } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

    export let family: Family

    let bg: String = "#fff"
    let disabled: boolean = false
    const dispatch = createEventDispatcher()

    function disable() {
        // turn background gray
        disabled = true;
        // disable buttons
    }

    function enable() {
        // turn background white
        disabled = false;
        // enable buttons
    }

    function deleteFamily(id: Number) {
        dispatch('clickDelete', { id: id })
    }
    function deactivateFamily(id: Number) {
        dispatch('clickDeactivate', { id: id })
    }
    function activateFamily(id: Number) {
        dispatch('clickActivate', { id: id })
    }
</script>

<tr id="f{family.id}" class:disabled class="border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700">
    <td class="px-6 py-4 whitespace-nowrap font-medium  text-gray-900 dark:text-white">{family.name}</td>
    <td class="px-6 py-4 whitespace-nowrap font-medium  text-gray-900 dark:text-white">{family.id}</td>
    <td class="px-6 py-4 whitespace-nowrap font-medium  text-gray-900 dark:text-white"></td>
    <td class="px-6 py-4 whitespace-nowrap font-medium  text-gray-900 dark:text-white">
        {#if family.isActive}
        <Button on:click="{() => deactivateFamily(family.id)}" outline={true} {disabled} class="!p-2">
        <!-- <Button outline={true} class="!p-2"> -->
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8518 11.9016 21.8517 12.0987 21.8231 12.2236C21.7849 12.3899 21.7164 12.4985 21.5792 12.7156C21.2793 13.1901 20.8222 13.8571 20.2165 14.5805M6.72432 6.71504C4.56225 8.1817 3.09445 10.2194 2.42111 11.2853C2.28428 11.5019 2.21587 11.6102 2.17774 11.7765C2.1491 11.9014 2.14909 12.0984 2.17771 12.2234C2.21583 12.3897 2.28393 12.4975 2.42013 12.7132C3.54554 14.4952 6.89541 19 12.0004 19C14.0588 19 15.8319 18.2676 17.2888 17.2766M3.00042 3L21.0004 21M9.8791 9.87868C9.3362 10.4216 9.00042 11.1716 9.00042 12C9.00042 13.6569 10.3436 15 12.0004 15C12.8288 15 13.5788 14.6642 14.1217 14.1213" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </Button>
        {:else}
        <Button on:click="{() => activateFamily(family.id)}" outline={true} {disabled} class="!p-2">
        <!-- <Button outline={true} class="!p-2"> -->
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </Button>
        {/if}
        <Button on:click="{() => deleteFamily(family.id)}" outline={true} class="!p-2"><svg class="w-5 h-5" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.33606 3.14838H15.3361M3.33606 6.14838H21.3361M19.3361 6.14838L18.6348 16.6677C18.5296 18.2459 18.4769 19.035 18.1361 19.6334C17.836 20.1602 17.3833 20.5837 16.8377 20.8481C16.218 21.1484 15.4272 21.1484 13.8454 21.1484H10.8267C9.24497 21.1484 8.45409 21.1484 7.8344 20.8481C7.28882 20.5837 6.83615 20.1602 6.53604 19.6334C6.19517 19.035 6.14256 18.2459 6.03735 16.6677L5.33606 6.14838M10.3361 10.6484V15.6484M14.3361 10.6484V15.6484" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </Button>
    </td>
</tr>

<style>
    .disabled {
        background-color: "#eee";
    }
</style>