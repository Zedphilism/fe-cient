---
title: "HTTP: Stateless Protocol"
date: 2026-04-18
tags: [semester-3, scsr2213, networking]
---

# HTTP: Stateless Protocol

HTTP (HyperText Transfer Protocol) is the application-layer protocol of the Web, running over TCP on port 80, in which a client sends requests for named objects and a server responds with those objects — and the server retains no memory of past requests.

## Explanation

A **web page** consists of objects: an HTML base file plus referenced objects (images, CSS, scripts), each addressable by a URL. When you browse the web, your browser (HTTP client) sends HTTP request messages to web servers, which respond with HTTP response messages containing the requested objects.

HTTP is built on **TCP** — the browser first establishes a TCP connection to the server (port 80 by default), then sends HTTP messages over that connection. TCP provides the reliable delivery that HTTP relies on.

HTTP is **stateless**: the server does not remember anything about previous requests from a client. Each request is independent. This simplifies server design (no need to manage per-client state across requests), but it means additional mechanisms (cookies, sessions) are needed for applications that need to track users.

**HTTP request message** (ASCII text):
- Request line: method (GET, POST, PUT, HEAD), URL, HTTP version
- Header lines: Host, User-Agent, Accept, Connection, etc.
- Optional body (for POST)

**HTTP response message:**
- Status line: HTTP version, status code, phrase (e.g., "200 OK")
- Header lines: Date, Server, Content-Length, Content-Type, etc.
- Body: the requested object

**Common status codes:** 200 OK, 301 Moved Permanently, 400 Bad Request, 404 Not Found, 505 HTTP Version Not Supported.

## Key Points

- HTTP = application layer protocol of the Web (RFC 7230)
- Uses TCP, port 80 (HTTPS uses TLS over TCP, port 443)
- Stateless: server keeps no memory of prior requests
- Request methods: GET (retrieve), POST (submit data), PUT (upload file), HEAD (headers only)
- Web page = 1 base HTML file + multiple referenced objects

## Example

A minimal HTTP GET request:
```
GET /index.html HTTP/1.1\r\n
Host: www.utm.my\r\n
\r\n
```

A server response:
```
HTTP/1.1 200 OK\r\n
Content-Type: text/html\r\n
Content-Length: 1024\r\n
\r\n
<html>...</html>
```

If the file has moved: server replies `301 Moved Permanently` with a `Location:` header pointing to the new URL, and the browser re-issues the GET to the new URL.

## See Also

- [[http-persistent-vs-non-persistent|Persistent HTTP Reuses a TCP Connection to Reduce RTT Overhead]] — connection management
- [[http-cookies-for-state|HTTP Cookies Let Servers Track State Across Stateless Requests]] — adding state to HTTP
- [[web-caching-proxy-servers|Web Caches Reduce Latency by Serving Cached Copies Locally]] — caching HTTP responses
