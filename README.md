# SBA 12: Movie Finder API

## By [Mamadou Moussa Balde](https://www.linkedin.com/in/2mb/)

This is an Express API. It does not serve an HTML page. It reads `PORT`, `OMDB_BASE_URL`, and `OMDB_API_KEY` from the environment and forwards movie lookups to that OMDB address. The responses below are from this run, which listened at http://localhost:3001.

From this folder:

```
npm install
npm start
```

`npm run dev` starts the same file with nodemon.

## GET /

The root returns this JSON.

![GET / returns 200](docs/screenshots/home.png)

## GET /api/search

The search route reads `title` from the query string and sends it to OMDB as the `s` parameter, along with the API key. The route returns the OMDB body as it arrived.

With no `title`, or with an empty `title`, the route returns 400 before it calls OMDB.

![GET /api/search with no title returns 400](docs/screenshots/missing-title.png)

`title=inception` returned 200. The body has 10 matches and `"totalResults": "41"`. That count is a string. The route does not send a page parameter, so this is the first page of matches.

| Title | Year | imdbID | Type |
| --- | --- | --- | --- |
| Inception | 2010 | tt1375666 | movie |
| Inception: The Cobol Job | 2010 | tt5295894 | movie |
| The Crack: Inception | 2019 | tt6793710 | movie |
| Inception: Jump Right Into the Action | 2010 | tt5295990 | movie |
| Inception: Motion Comics | 2010– | tt1790736 | series |
| Inception | 2014 | tt7321322 | movie |
| Madness Inception | 2022 | tt29258696 | movie |
| Inception: 4Movie Premiere Special | 2010 | tt1686778 | movie |
| Bikini Inception | 2017 | tt8269586 | movie |
| WWA: The Inception | 2001 | tt0311992 | movie |

Madness Inception and Inception: 4Movie Premiere Special have `"Poster": "N/A"`. The rest have a poster URL.

![The start of the inception search](docs/screenshots/search.png)

![The end of the inception search, with totalResults 41](docs/screenshots/search-end.png)

A title OMDB does not know still comes back as 200. The body says the search failed.

![A search for zzzznotamovie returns 200](docs/screenshots/no-match.png)

## GET /api/movies/:id

The details route sends the id to OMDB as the `i` parameter and returns that body. `tt1375666` is the 2010 Inception movie: PG-13, 148 min, directed by Christopher Nolan, rated 8.8 on IMDb, 86% on Rotten Tomatoes, and 74 on Metacritic. The box office in this response is `$292,587,330`.

![GET /api/movies/tt1375666 returns 200](docs/screenshots/details.png)

`not-an-id` also returns 200. The body is a JSON string, not an object. The string is `{"Response":"False","Error":"Conversion from string "not-an-id" to type 'Double' is not valid."}`.

![GET /api/movies/not-an-id returns 200](docs/screenshots/bad-id.png)

## Anything else

A path this server does not define returns Express's HTML 404. The visible line is `Cannot GET /api/nope`.

![GET /api/nope returns 404](docs/screenshots/missing-route.png)

If the call to OMDB throws, search responds with 500 and `{ "error": "Failed to fetch search results" }`. Details responds with 500 and `{ "error": "Failed to fetch movie details" }`. The same failure is printed with `console.error`. This run did not hit that branch.
