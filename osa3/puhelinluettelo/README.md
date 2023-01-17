# Puhlu-frontend

Can be found at https://fullstack-fron.huone105.com

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Podman

You can build this project as container with `podman build -t puhlu-frontend .`
After that, it can be run with `podman run --detach -p 3000:80 puhlu-frontend`.

## .env

For development, copy the `.env.example` to `.env.development` and
add the correct values to there.

For production copy it to `.env.production`