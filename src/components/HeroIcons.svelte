<script lang="ts">
  interface App {
    name: string;
    accent: string;
  }

  let { apps }: { apps: App[] } = $props();
  let x = $state(0);
  let y = $state(0);

  function onmove(e: PointerEvent) {
    x = (e.clientX / window.innerWidth - 0.5) * 2;
    y = (e.clientY / window.innerHeight - 0.5) * 2;
  }
</script>

<svelte:window onpointermove={onmove} />

<div class="icons" aria-hidden="true">
  {#each apps as app, i (app.name)}
    <span
      class="icon"
      style:--accent={app.accent}
      style:--i={i}
      style:--dx="{x * (10 + i * 6)}px"
      style:--dy="{y * (10 + i * 6)}px"
    >
      {app.name[0]}
    </span>
  {/each}
</div>

<style>
  .icons {
    display: flex;
    gap: 1.25rem;
    margin-top: 3rem;
  }
  .icon {
    display: grid;
    place-items: center;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 1.25rem;
    background: var(--accent);
    color: #fff;
    font-family: var(--font-serif);
    font-size: 2rem;
    box-shadow: 0 0.9rem 1.8rem -0.8rem var(--accent);
    translate: var(--dx) var(--dy);
    transition: translate 0.4s ease-out;
    animation: bob 5s ease-in-out infinite;
    animation-delay: calc(var(--i) * -1.4s);
  }
  @keyframes bob {
    50% {
      transform: translateY(-0.6rem);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .icon {
      animation: none;
      translate: none;
      transition: none;
    }
  }
</style>
