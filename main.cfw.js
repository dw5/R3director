/* R3director */
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const searchQuery = new URL(request.url).searchParams.get('q');
  let success = 0;
  let debugge = 0;

  const defaultSearch = "https://searx.neocities.org/?q=";
  const bangs = ["!ddg", "!yt", "!w", "!gt"];
  const redirto = [
    "https://duckduckgo.com/?q=",
    "https://www.youtube.com/results?search_query=",
    "https://duckduckgo.com/?q=!w ",
    "https://translate.google.com/#auto/en/test"
  ];

  for (let i = 0; i < bangs.length; i++) {
    if (searchQuery.startsWith(bangs[i])) {
      const nicerQuery = searchQuery.replace(bangs[i] + " ", "");
      const redirectMeTo = redirto[i];
      success = 1;

      if (debugge === 1) {
        console.log(nicerQuery);
        console.log(redirectMeTo);
      }

      return Response.redirect(redirectMeTo + nicerQuery);
    }
  }

  if (success !== 1) {
    const nicerQuery = searchQuery;
    const redirectMeTo = defaultSearch;

    if (debugge === 1) {
      console.log(nicerQuery);
      console.log(redirectMeTo);
    }

    return Response.redirect(redirectMeTo + nicerQuery);
  }

  /* etc */
  return new Response('Not Found', { status: 404 });
}
