# URL Shortener

## Reason
Shortening URLs can be handy where there is a limit for the number of characters, for example: chat boxes of twitter, instagram, facebook and other platforms.

## API Endpoints for Requests
### Generate a short URL-
POST - http://127.0.0.1/shorten
POST - http://127.0.0.1/shorten/<user_id>

Body: must include "url"
```json
{
  "url" "www.hello.com"
}
```

### Redirect URL -
GET - http://127.0.0.1/<suffix_hash>

### Sign up -
POST - http://127.0.0.1/sign_up

Body: must include "email" and "name"
```json
{
  "email": "lior@walla.com"
  "name": "lior"
}
```

### Get user's URLs -
GET - http://127.0.0.1/shorten/<user_id>

## Load Balancer
The load balancer used in this system is HAProxy with the `RoundRobin` strategy.

## Cache
`flask_caching` has been used with the `SimpleCache` cache type.

## Data Base
MongoDB has been used as the DB and its collections have been sharded by their ID with the `hashed` strategy.

## Requirements
- Create front-end with React.
- Create back-end with Python.
- Create database with MongoDB.

- Generate a short URL from a long URL.
- Encode short URL path.
- Once a short URL has been entered to the address bar, redirect to the original (long) URL.
- Handle expired URL’s.
- Store: short URL, long URL, creation date, expiration date and the user to the DB.
- Load balancer.
- Create premium users.
- Make the search function as efficient as possible to prevent latency issues.
- Premium users can view their URLs history.

## Nice to Have
- Premium users have a longer expiration time.
- Premium users can choose a path to the short URL by following a set of rules that match the format.
