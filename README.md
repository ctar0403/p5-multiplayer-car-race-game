# p5 Multiplayer Car Race Game

A browser-based two-player car racing game built with p5.js, p5.play, SweetAlert, and Firebase Realtime Database.

The game uses a Teacher/Student flow:

- The Teacher creates a secret word and starts a new race room.
- The Student joins using that secret word.
- When both players have joined, the race starts.
- Players move their cars upward with the arrow key.
- The first player to reach the finish line gets the next rank.

## Project Status

This project is a static frontend game. It does not require a build step, package install, or local backend server.

Recent fixes include:

- Prevented repeated click-handler binding in the p5 draw loop.
- Hid inactive Teacher and Student controls until they are needed.
- Fixed the Student Firebase Cloud Function URL.
- Made player joining use a Firebase transaction to avoid duplicate player indexes.
- Prevented repeated finish/rank updates after reaching the finish line.
- Added explicit global declarations for car sprites.

## Tech Stack

- HTML, CSS, JavaScript
- p5.js
- p5.dom
- p5.sound
- p5.play
- Firebase Authentication
- Firebase Realtime Database
- SweetAlert

## Folder Structure

```text
.
+-- assets/
|   +-- bg.jpg
|   +-- car1.png
|   +-- car2.png
|   +-- cup.png
|   +-- favicon.png
|   +-- logo.png
|   +-- track.jpg
|   +-- track.png
+-- db_structure/
|   +-- db_modal.json
+-- js/
|   +-- Game.js
|   +-- Player.js
|   +-- Student.js
|   +-- Teacher.js
|   +-- Welcome.js
+-- libraries/
|   +-- p5.dom.js
|   +-- p5.js
|   +-- p5.play.js
|   +-- p5.sound.js
+-- index.html
+-- sketch.js
+-- style.css
+-- sweetalert.css
+-- sweetalert.min.js
```

## Prerequisites

You need:

- A modern web browser.
- Python 3 for the local static server.
- Internet access, because Firebase and jQuery are loaded from CDN URLs.
- Access to the Firebase project configured in `index.html`.

No `npm install` is required.

## Run Locally

From the project root, start a static web server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

If port `8000` is already in use, choose another port:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## How To Test Multiplayer

1. Open `http://localhost:8000` in one browser tab.
2. Click `Teacher`.
3. Click `Genrate Secret Word`.
4. Copy or remember the generated secret word.
5. Enter a teacher name and click `Play`.
6. Open `http://localhost:8000` in a second browser tab or window.
7. Click `Student`.
8. Enter the same secret word and click `Submit`.
9. Enter a student name and click `Play`.
10. Once both players have joined, the race screen should start.
11. Use the `Up Arrow` key in each tab to move that player's car.

For a cleaner test, use two separate browser windows or one normal window plus one private/incognito window.

## Gameplay Controls

```text
Up Arrow - Move the current player's car forward
```

## Firebase Data Shape

Race data is stored under a secret-word room:

```text
users/{secret_word}
```

Expected fields include:

```json
{
  "id": "abcde",
  "game_state": 0,
  "player_count": 0,
  "cars_at_end": 0,
  "players": {
    "player1": {
      "name": "Teacher",
      "distance": 0
    },
    "player2": {
      "name": "Student",
      "distance": 0
    }
  }
}
```

Game states:

```text
null - Welcome screen
0    - Waiting room / player join state
1    - Race in progress
2    - Race ended
```

## Important Notes

- This project depends on the Firebase configuration and Cloud Function URLs in the source code.
- The Teacher flow creates a new secret word and initializes a race room.
- The Student flow joins an existing race room by secret word.
- Both players must be connected before the race starts.
- If Firebase credentials, database rules, or Cloud Functions are no longer active, the game UI may load but multiplayer login will fail.

## Troubleshooting

### The page opens but buttons do not work

Open the browser developer console and check for JavaScript errors. Firebase CDN or Cloud Function network failures are the most likely cause.

### Student cannot join

Make sure:

- The Teacher generated a secret word first.
- The Student entered the exact same secret word.
- The browser has internet access.
- The Firebase Cloud Function is still deployed and reachable.

### Race does not start

Make sure both the Teacher and Student clicked `Play`. The race starts when `player_count` reaches `2`.

### Images do not load

Run the project through a local server instead of opening `index.html` directly from the filesystem.

```bash
python -m http.server 8000
```

## Development Checks

You can check the JavaScript files for syntax errors with Node.js:

```bash
node --check sketch.js
node --check js/Welcome.js
node --check js/Teacher.js
node --check js/Student.js
node --check js/Player.js
node --check js/Game.js
```

These commands only validate syntax. Full multiplayer behavior must be tested in the browser because it depends on Firebase and p5.js runtime globals.

## License

This project is licensed under the terms in `LICENSE`.
