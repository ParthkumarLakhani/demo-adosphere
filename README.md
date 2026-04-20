
Backend Take-Home Task
Time: 90 minutes

Build a URL shortener API using Node.js + Express + PostgreSQL.

Endpoints:

  POST /auth/login — takes email & password, returns a JWT
  POST /links — (auth required) takes original_url, saves it with a generated short code -- >> need to check ??
  GET /:code — redirects to the original URL, increments click count
  GET /links/my — (auth required) returns the user’s links with click counts

DB tables needed:
  users — id, email, password_hash, created_at
  links — id, user_id, original_url, short_code, click_count, created_at


Things we’ll look at:

  JWT middleware reused properly, not copy-pasted
  Rate limit the redirect route (/:code) to 10 req/min per IP
  Validate URLs before saving, return proper 400s
  Consistent error response shape
  No raw string interpolation in queries

If you finish early:

  Hook up Redis for rate limiting instead of in-memory
  Add a /stats endpoint showing click count
  Write a couple of tests with supertest

  Submit a GitHub link or zip. Working > perfect.