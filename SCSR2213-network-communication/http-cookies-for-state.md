---
title: "HTTP Cookies"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# HTTP Cookies

Cookies are small pieces of data that a web server sends to a browser to be stored and returned with future requests, giving the illusion of statefulness to an otherwise stateless HTTP protocol.

## Explanation

HTTP is stateless — each request is handled independently with no memory of past interactions. However, many web applications need to track users: shopping carts, login sessions, personalized recommendations. Cookies solve this.

Cookies involve four components working together:

1. **Cookie header in HTTP response:** When a user first visits a site, the server generates a unique cookie ID and sends it in the response: `Set-Cookie: 1678`
2. **Cookie header in HTTP request:** The browser stores the cookie and includes it in all future requests to the same domain: `Cookie: 1678`
3. **Cookie file on client:** The browser manages a local cookie file, associating cookie values with domain names
4. **Backend database at server:** The server associates the cookie ID with user data (shopping cart contents, name, address, preferences)

Each subsequent visit, the browser sends the cookie ID, and the server looks up the user's state in its database.

Cookies have legitimate uses (authentication, session state, shopping carts) and privacy-invasive uses (tracking cookies that follow users across multiple websites by embedding third-party cookie requests in every page load).

## Key Points

- Cookies = mechanism for adding state to stateless HTTP
- Four components: response header `Set-Cookie`, request header `Cookie`, browser cookie file, server database
- Cookie ID links each HTTP request to a user's stored state on the server
- Uses: authorization, shopping carts, recommendations, session tracking
- Privacy concern: third-party cookies enable cross-site tracking

## Example

Susan visits amazon.com for the first time:
1. Server generates ID `1678`, stores Susan's session in DB, sends `Set-Cookie: 1678`
2. Susan's browser saves: `amazon.com → 1678`
3. Susan browses, adds items to cart — server maps those to ID `1678`
4. One week later, Susan revisits — browser sends `Cookie: 1678`
5. Amazon recognises her, shows cart, greets her by name

## See Also

- [[http-stateless-protocol|HTTP Is a Stateless Client-Server Protocol]] — why cookies are needed
- [[web-caching-proxy-servers|Web Caches Reduce Latency by Serving Cached Copies Locally]] — another HTTP mechanism
