# NukeURL

NukeURL is a URL shortener API. It allows you to create short, easy-to-remember URLs from long and complex ones.

## Endpoints

- `POST /url`: Create a new short URL. Send a JSON body with the `url` field set to the URL you want to shorten.
- `GET /:shortID`: Redirect to the original URL associated with the given short ID.
- `GET /api-docs`: View the Swagger UI documentation for the API.

## Setup

1. Clone the repository: `git clone https://github.com/Mrinank-Bhowmick/NukeURL`
2. Install dependencies: `npm install`
3. Start the server: `npm start`
