<script lang="ts">
  export let checked: any = false;
  export let label: any = "";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<div class="flex my-2 items-center">
  <div>
    <input
      {checked}
      on:click={(e) => dispatch("change", e)}
      class="form-check-input appearance-none h-4 w-4 border checked:dark:border-primary dark:border-slate-600 border-slate-400 rounded-sm bg-transparent checked:bg-primary checked:border-primary focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
      type="checkbox"
      id={label}
    />
  </div>

  {#if label}
    <label
      for={label}
      class="text-[13px] cursor-pointer capitalize font-medium dark:text-slate-300 text-slate-600 flex ml-2"
    >
      {label}
    </label>
  {/if}
</div>

<style scoped>
  .form-check-input:checked[type="checkbox"] {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
  }
</style>
