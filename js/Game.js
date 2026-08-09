class Game {
  constructor() {
    this.isPlaying = false;
    this.hasFinished = false;
    this.isWatchingPlayerCount = false;
  }

  getState(secret_word) {
    var gameStateRef = db.ref(`users/${secret_word}/game_state/`);
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    db.ref(`users/${secret_word}/`).update({
      game_state: state,
    });
  }

  async start() {
    // When user visit the page
    if (gameState === null) {
      welcome.display();
    }

    // //When user loged in successfully
    if (gameState === 0 && !this.isWatchingPlayerCount) {
      this.isWatchingPlayerCount = true;
      var playerCountRef = await db
        .ref(`users/${secret_word}/player_count/`)
        .once("value");

      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
    }
  }

  play() {
    if (!this.isPlaying) {
      Player.getPlayerInfo();
      player.getCarsAtEnd();
      this.isPlaying = true;
    }

    if (allPlayers !== undefined) {
      background("#464646");
      image(track, 0, -height * 4, width, height * 5);

      //var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = width / 2 - 680;
      var y;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = x + 455;
        //use data form the database to display the cars in y direction
        y = height - allPlayers[plr].distance;
        if (!cars[index - 1]) {
          continue;
        }
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = width / 2;
          camera.position.y = cars[index - 1].y;
        }
      }
    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 10;
      player.update();
    }

    if (!this.hasFinished && player.distance > height * 5 - 100) {
      this.hasFinished = true;
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
      game.update(2);
      swal({
        title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
        text: "You reached the finish line successfully",
        imageUrl:
          "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
        imageSize: "100x100",
        confirmButtonText: "Ok",
      });
    }

    drawSprites();
  }

  end() {}
}
