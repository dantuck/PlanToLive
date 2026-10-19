interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === 'www.plantolive.app') {
      url.hostname = 'plantolive.app';
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
