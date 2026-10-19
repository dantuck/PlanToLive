<script lang="ts">
  import Phone from './Phone.svelte';

  interface App {
    slug: string;
    name: string;
    tagline: string;
    accent: string;
    status: 'live' | 'beta' | 'soon';
  }

  let { apps }: { apps: App[] } = $props();
  let active = $state<string | null>(null);

  const tint = $derived(apps.find((a) => a.slug === active)?.accent ?? 'transparent');
</script>

<section class="showcase" id="apps" style:--tint={tint}>
  <div class="wrap">
    <p class="eyebrow">The apps</p>
    <ul>
      {#each apps as app (app.slug)}
        <li style:--accent={app.accent}>
          <a
            href={`/apps/${app.slug}`}
            onmouseenter={() => (active = app.slug)}
            onmouseleave={() => (active = null)}
            onfocus={() => (active = app.slug)}
            onblur={() => (active = null)}
          >
            <span class="icon" aria-hidden="true">{app.name[0]}</span>
            <h3>{app.name}</h3>
            <p>{app.tagline}</p>
            <div class="mock"><Phone name={app.name} accent={app.accent} /></div>
            {#if app.status !== 'live'}
              <span class="badge">{app.status === 'beta' ? 'Beta' : 'Coming soon'}</span>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .showcase {
    padding-block: 4rem;
    background: color-mix(in srgb, var(--tint) 10%, transparent);
    transition: background-color 0.4s;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0 0;
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }
  a {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1.75rem;
    border: 1px solid var(--line);
    border-radius: 1.25rem;
    background: var(--card);
    text-decoration: none;
    transition:
      transform 0.25s,
      border-color 0.25s;
  }
  a:hover,
  a:focus-visible {
    transform: translateY(-4px);
    border-color: var(--accent);
    outline: none;
  }
  .icon {
    display: grid;
    place-items: center;
    width: 3.25rem;
    height: 3.25rem;
    margin-bottom: 1.25rem;
    border-radius: 0.9rem;
    background: var(--accent);
    color: #fff;
    font-family: var(--font-serif);
    font-size: 1.6rem;
  }
  h3 {
    font-size: 1.6rem;
  }
  p {
    margin: 0.5rem 0 0;
    color: var(--muted);
  }
  .mock {
    display: flex;
    justify-content: center;
    margin-top: auto;
    padding-top: 1.5rem;
    transition: transform 0.35s;
  }
  a:hover .mock,
  a:focus-visible .mock {
    transform: translateY(-6px) rotate(-2deg);
  }
  .badge {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    border: 1px solid var(--line);
    color: var(--muted);
  }
  @media (prefers-reduced-motion: reduce) {
    a,
    .mock,
    .showcase {
      transition: none;
    }
  }
</style>
