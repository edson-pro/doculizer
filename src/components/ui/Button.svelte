<script lang="ts">
  import Spinner from "./Spinner.svelte";

  export let href: string = "";
  export let disabled: boolean = false;
  export let loading: boolean | undefined = false;
  export let fullWidth: boolean = false;
  export let leftIcon: any = null;
  export let rightIcon: any = null;
  export let loaderPosition: string = "left";
  export let size: string = "md";
  export let rounded: string = "sm";
  export let color: string = "primary";
  export let variant: string = "filled";
  export let click: any = null;
  export let customClass: string = "";

  $: roundedClass = {
    sm: "rounded-[2px]",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
    none: "rounded-none",
  }[rounded];

  $: variantClass = {
    filled: "bg-opacity-95 hover:bg-opacity-100 text-white",
    light: "bg-opacity-20 hover:bg-opacity-25 text-white-",
    outline: "bg-opacity-0 hover:bg-opacity-10 border",
    default: "bg-opacity-50 dark:border-slate-800 hover:bg-opacity-75 border",
    subtle: "bg-opacity-0 hover:bg-opacity-10",
    white: "bg-white",
  }[variant];

  $: sizeClass = {
    xs: "px-3 py-[6px]  leading-4 font-medium  text-[12px] ",
    sm: "px-3 py-[9px]  leading-4 font-medium  text-[13px] ",
    md: "px-4 py-[8px] font-medium text-[13px] ",
    lg: "px-5 py-3 font-medium text-base",
  }[size];

  const bgs = {
    primary: "bg-primary",
    danger: "bg-red-500",
    success: "bg-green-500",
    slate: "dark:bg-slate-700 bg-blue-100 !text-blue-500 dark:!bg-opacity-50",
  }[color];

  const texts = {
    primary: "text-primary",
    danger: "text-red-500",
    success: "bg-green-500",
  }[color];

  const borders = {
    primary: "border-primary",
    danger: "border-red-500",
    success: "border-green-500",
  }[color];

  $: colorClass =
    variant === "white"
      ? "text-primary"
      : variant === "default"
      ? "text-slate-800 dark:text-slate-400 border-slate-300 bg-slate-100 dark:bg-opacity-50 dark:bg-slate-800"
      : variant === "subtle" || variant === "light"
      ? `${texts} + ${bgs}`
      : bgs +
        " " +
        (variant === "" || variant === "outline" ? texts : " ") +
        " " +
        (variant === "outline" ? borders : " ");

  $: globalClass =
    "inline-flex gap-2 outline-none items-center truncate justify-center relative my-1 cursor-pointer select-none transition-all active:scale-95" +
    ` ${disabled || loading ? "pointer-events-none  opacity-70" : ""} ${
      fullWidth ? "w-full" : ""
    }`;
</script>

<a
  href={href || null}
  {...$$restProps}
  on:click={click}
  class="{globalClass} {variantClass} {sizeClass} {colorClass} {roundedClass} {customClass}"
>
  {#if leftIcon && !loading}
    <svelte:component
      this={leftIcon}
      size={"15"}
      class={fullWidth ? "mr-4" : "mr-1"}
    />
  {/if}
  {#if loaderPosition === `left` && loading}
    <div class={fullWidth ? "mr-4" : "mr-2"}>
      <Spinner />
    </div>
  {/if}
  <slot>Click me</slot>
  {#if loaderPosition === `right` && loading}
    <div class="ml-2">
      <Spinner />
    </div>
  {/if}
  {#if rightIcon && !loading}
    <svelte:component this={rightIcon} size={"16"} class={"ml-2"} />
  {/if}
</a>
