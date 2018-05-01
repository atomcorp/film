# Event listener

```js
/**
 * Outputs the event that happened
 *
 * @param {MyEvent} e - The observable event.
 * @listens MyEvent
 */
function myEventLogger(e) {
  console.log(e);
}
```

# Type
```js
/**
 * An object returned from an OMDB api search
 * @typedef {Object} omdbSearchResult
 * @property {string} Title - Title of the film
 * @property {string} Year - Year of films release
 * @property {string} imdbID - IMDB ID
 * @property {string} Type - Whether movie or TV etc
 * @property {string} Poster - URL to jpg of movie poster
 */
```

