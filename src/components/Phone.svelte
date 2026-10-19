<script lang="ts">
  let { name, accent }: { name: string; accent: string } = $props();
</script>

<div class="phone" style:--accent={accent} aria-hidden="true">
  <div class="notch"></div>
  <div class="screen">
    <div class="top">
      <span class="dot">{name[0]}</span>
      <span class="title">{name}</span>
    </div>
    <div class="hero-card"></div>
    <div class="row"><i></i><b></b></div>
    <div class="row"><i></i><b></b></div>
    <div class="row"><i></i><b></b></div>
  </div>
</div>

<style>
  .phone {
    width: 9.5rem;
    aspect-ratio: 9 / 18.5;
    padding: 0.4rem;
    border-radius: 1.6rem;
    background: #1d1a16;
    box-shadow: 0 1.2rem 2.5rem -1rem color-mix(in srgb, var(--accent) 55%, transparent);
    position: relative;
  }
  .notch {
    position: absolute;
    top: 0.65rem;
    left: 50%;
    width: 2.6rem;
    height: 0.6rem;
    transform: translateX(-50%);
    border-radius: 999px;
    background: #1d1a16;
    z-index: 1;
  }
  .screen {
    height: 100%;
    padding: 1.6rem 0.7rem 0.7rem;
    border-radius: 1.25rem;
    background: color-mix(in srgb, var(--accent) 8%, #fffdf9);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: hidden;
  }
  .top {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: #1d1a16;
    font-family: var(--font-serif);
    font-size: 0.75rem;
  }
  .dot {
    display: grid;
    place-items: center;
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 0.35rem;
    background: var(--accent);
    color: #fff;
    font-size: 0.65rem;
  }
  .hero-card {
    height: 3.4rem;
    border-radius: 0.7rem;
    background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 55%, #fff));
  }
  .row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .row i {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 0.4rem;
    background: color-mix(in srgb, var(--accent) 30%, #fff);
  }
  .row b {
    flex: 1;
    height: 0.45rem;
    border-radius: 999px;
    background: color-mix(in srgb, #1d1a16 14%, transparent);
  }
</style>
