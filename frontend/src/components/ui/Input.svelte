<script lang="ts">
  import Loader from "./Loader.svelte";
  import { EyeIcon, EyeOffIcon } from "svelte-feather-icons";
  export let placeholder: string = "";
  export let value: string = "";
  export let type: string = "text";
  export let label: string = "";
  export let leftIcon: any = null;
  export let loading: boolean = false;
  export let error: string = "";
  export let disabled: boolean = false;
  export let size: string = "md";
  export let rounded: string = "sm";
  export let variant: string = "default";

  $: variantClass = {
    default:
      " block w-full sm:text-sm border dark:bg-slate-800 dark:bg-opacity-80 bg-transparent " +
      (error
        ? " dark:border-red-600 border-red-500"
        : "dark:border-slate-700 dark:border-opacity-70 border-slate-300"),
    filled:
      " block w-full sm:text-sm bg-opacity-50 dark:bg-opacity-75 border-opacity-50 dark:border-opacity-25  border dark:bg-slate-800 dark:border-slate-800 bg-slate-200  border-slate-200 ",
    unstyled: " block w-full sm:text-sm  bg-transparent border-transparent ",
  }[variant];

  $: roundedClass = {
    sm: "rounded-[3px]",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
    none: "rounded-none",
  }[rounded];

  $: sizeClass = {
    sm: "px-2 py-2  leading-4 font-medium  text-[13px] ",
    md: "px-4 py-[10px] font-medium text-[13px]",
    lg: "px-5 py-3 font-medium text-sm",
  }[size];

  $: globalClass =
    "outline-none mb-[2px] max-w-4xl" +
    ` ${disabled ? "pointer-events-none opacity-70" : ""} ` +
    (error
      ? " placeholder-red-500 text-red-500"
      : "dark:text-slate-300 text-slate-500");

  $: globalLabelClass =
    "block mb-2  dark:text-slate-200 text-[13px] font-medium dark:text-slate-400 text-slate-700" +
    ` ${disabled ? "pointer-events-none opacity-70" : ""}`;

  let showPassword = false;

  const tooglePassword = () => {
    showPassword = !showPassword;
  };
</script>

<div class="flex items-start flex-col">
  {#if label}
    <label for="input" class={globalLabelClass}>{label}</label>
  {/if}
  <div class="relative w-full">
    {#if leftIcon}
      <div>
        <svelte:component
          this={leftIcon}
          class="w-5 h-5 text-slate-400 absolute top-[23%] left-3"
        />
      </div>
    {/if}
    {#if loading}
      <div class="w-5 h-5 text-slate-400 absolute top-[27%] right-3">
        <svelte:component this={Loader} color="default" />
      </div>
    {/if}
    {#if type === "password"}
      <div class="absolute top-[30%] right-3">
        {#if showPassword}
          <a
            href={null}
            on:click={tooglePassword}
            class="cursor-pointer active:translate-y-[1px]"
          >
            <EyeIcon size={"16"} />
          </a>
        {:else}
          <a
            href={null}
            class="cursor-pointer active:translate-y-[1px]"
            on:click={tooglePassword}
          >
            <EyeOffIcon size={"16"} />
          </a>
        {/if}
      </div>
    {/if}
    <input
      bind:value
      {...$$props}
      type="text"
      {placeholder}
      class="{variantClass} focus:border-primary {roundedClass}  {sizeClass}  {globalClass}  {leftIcon &&
        'pl-10'}"
    />
  </div>
</div>
{#if error}
  <span
    class="text-[13px] w-full text-left block mt-1 capitalize dark:font-medium font-medium text-red-500"
    >{error}</span
  >
{/if}
