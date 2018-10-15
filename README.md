# Spotify Recommendation App

To start please replace the client-id with your spotify client id in .env file.
```
    SPOTIFY_CLIENT_ID= client-id
    SPOTIFY_SCOPES= user-top-read
    SPOTIFY_REDIRECT= http://localhost:8080/callback
```

After .env file ready.
```
npm install
npm start
```

or you can use yarn.

Then visit: http://localhost:8080/

## Redux & Ducks structure
I used re-ducks file structure for manage redux files. For more information pleas visit : https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be

## Styling
It uses bootstrap and BEM for custom class names. More information naming with BEM please check http://getbem.com/introduction/

## Test
Run test in watch mode
```
npm run test:watch
```

Run tests with lint
```
npm test
```