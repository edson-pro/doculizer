<script lang="ts">
  import { page } from "$app/stores";
  import Button from "@/components/ui/Button.svelte";
</script>

{#if $page.error}
  <div class="pt-[70px] pb-0">
    <div class="rounded-3xl px-3 pt-20 pb-24 flex flex-col">
      <main
        class="flex-grow flex flex-col justify-start max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div class="flex-shrink-0 flex justify-start">
          <a href="/" class="inline-flex">
            <span class="sr-only">404</span>
            <img
              alt={$page.error.message}
              class="h-24 w-auto"
              src={$page.status === 404
                ? "/images/404-error.png"
                : $page.status === 500
                ? "/images/500-error.png"
                : ""}
            />
          </a>
        </div>
        <div class="py-4">
          <div class="text-center flex flex-col items-start justify-start">
            <div class="">
              <p
                class="rounded-[2px] w-fit bg-primary bg-opacity-25 px-2.5 py-1 text-[12px] font-semibold text-primary tracking-wide uppercase"
              >
                {$page.status} error
              </p>
            </div>
            <h1
              class="mb-3 mt-5 font-semibold text-slate-800 tracking-tight text-lg"
            >
              {$page.status === 404
                ? "Page not found."
                : $page.status === 500
                ? "Internal error occurred"
                : ""}
            </h1>
            <p class="mt-0 text-sm font-medium text-slate-500">
              {$page.status === 404
                ? " Sorry, we couldn’t find the page you’re looking for."
                : $page.status === 500
                ? "Internal error occurred. contact the administrator"
                : ""}
            </p>
            <div class="mt-6">
              <Button href="/">Take me back home</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
{/if}
