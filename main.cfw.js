/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

/* R3director */
addEventListener('fetch', event => {
  //event.passThroughOnException() // Optional; you know best
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = request.url
  const searchQuery = new URL(request.url).searchParams.get('q');
  const debugParam = new URL(request.url).searchParams.get('debug');
 console.log("QUERY: "+ searchQuery);
  let success = 0;
  let debugge = 0;  if (debugParam === 'true') {debugge = 1; console.log("DBG!");}

  debugge 

  const defaultSearch = "https://searx.neocities.org/?q=";
  const bangs = ["!ddg", "!yt", "!w", "!gt"];
  const redirto = [
    "https://duckduckgo.com/?q=",
    "https://www.youtube.com/results?search_query=",
    "https://duckduckgo.com/?q=!w ",
    "https://translate.google.com/#auto/en/"
  ];

  if (searchQuery) {
    for (let i = 0; i < bangs.length; i++) {
      if (searchQuery.startsWith(bangs[i])) {
        const nicerQuery = searchQuery.replace(bangs[i] + " ", "");
        const redirectMeTo = redirto[i];
        success = 1;

        if (debugge === 1) {
          console.log("BANG SEEN");
          console.log(nicerQuery);
          console.log(redirectMeTo);
        }

        return Response.redirect(redirectMeTo + nicerQuery);
      }
    }

    if (searchQuery.startsWith("!")) {
      const message = "You're using unintegrated bang! \n" + searchQuery;
      return new Response(message, { status: 200 });
    }
  }
  
  if (!searchQuery) {
    const form = `
      <style>
        .search-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        
        .search-form {
          max-width: 400px;
          width: 90%;
        }
        
        .search-bar {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        
        .submit-btn {
          width: 100%;
          margin-top: 10px;
          padding: 10px;
          font-size: 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      </style><title>R3director</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <div class="search-container">
        <form class="search-form" action="/" method="get" target="" autocomplete="off">
          <input class="search-bar" autofocus="" name="q" placeholder="R3Director" type="text"> 
          <input class="submit-btn" type="submit" value="Search">
        </form>
      </div>
    `;
    return new Response(form, { headers: { 'Content-Type': 'text/html' } });
  }

  const nicerQuery = searchQuery || "";
  const redirectMeTo = defaultSearch;

  if (debugge === 1) {
    console.log("DEFAULT TO");
    console.log(nicerQuery);
    console.log(redirectMeTo);
  }

  return Response.redirect(redirectMeTo + nicerQuery);

  /* etc */
  return new Response('Not Found', { status: 404 });
}
