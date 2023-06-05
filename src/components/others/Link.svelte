<script>
  export let text;

  console.log(encodeURIComponent(text.toString("utf-8")));
</script>

<a target="_blank" href={text}>
  {@html text}
</a>
