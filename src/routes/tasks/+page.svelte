<script>
	import { Alert, Button, Datepicker, Input, Label, NumberInput, Select, Textarea } from 'flowbite-svelte';
    let selected = 1;
    let categories = [
        {value: "1", name: "Gardening"},
        {value: "2", name: "Animal Care"},
        {value: "3", name: "Food Prep"},
        {value: "4", name: "Clean Up"},
    ]

    export let form;
</script>

<div class="p-8">
	<Alert>
		<span class="font-medium">Okay!</span> We are cooking with gas.
	</Alert>
    <form method="POST" action="/tasks?/create">
        <Label for="duration" class="mb-2">Hours</Label>
            <NumberInput type="text" id="duration" placeholder="1" required  />
        <Label for="performed_on" class="mb-2">Performed On:</Label>
            <Datepicker name="performed_on" datepickerTitle="Performed On:" />
        <Label for="description" class="mb-2">Description</Label>
            <Textarea id="description" placeholder="Optional extra details" rows="4" name="message"/>
        <Label for="task_category">Select an option
            <Select id="task_category" class="mt-2" items={categories} bind:value={selected} />
        </Label>
        <Button type="submit">Submit</Button>
    </form>
    {#if form?.success}
    <Alert>
        <span class="font-medium">You submitted a task.</span>
    </Alert>
    {/if}
</div>