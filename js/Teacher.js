class Teacher {
  constructor() {
    this.generateSecretWord = createButton("Genrate Secret Word");
    this.message = createElement("h3");
    this.secretWord = createElement("h3");

    this.nameInput = createInput("").attribute("placeholder", "Name");
    this.greeting = createElement("h2");
    this.greeting2 = createElement("h3");

    this.playButton = createButton("Play");
    this.isDisplayed = false;
    this.generateSecretWord.hide();
    this.message.hide();
    this.secretWord.hide();
    this.nameInput.hide();
    this.greeting.hide();
    this.greeting2.hide();
    this.playButton.hide();
  }

  hideElements() {
    this.generateSecretWord.hide();
    this.message.hide();
    this.secretWord.hide();
    this.nameInput.hide();
    this.greeting.hide();
    this.greeting2.hide();
    this.playButton.hide();
  }

  setElementPosition() {
    this.generateSecretWord.position(width / 2.3, height / 2 - 100);
    this.message.position(width / 2.7, height / 2 - 250);
    this.secretWord.position(width / 2.3, height / 2 - 200);
  }

  setElementStyle() {
    this.generateSecretWord.class("customButton");
    this.nameInput.class("customInput");
    this.playButton.class("customButton");
  }

  makeId(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getToken(word) {
    var url = `https://us-central1-trial-car-racing-game.cloudfunctions.net/genrateToken?secret_word=${word}`;
    httpGet(url, "json", false, (response) => {
      if (response.success) {
        db.ref(`users/${word}`).update({
          id: word,
          game_state: 0,
          player_count: 0,
          player_rank: 0,
          cars_at_end: 0,
        });
        this.login(response.token, word);
      } else {
        swal({
          title: `Unsuccessfull Login`,
          text: `${response.error_message}`,
          type: "error",
          confirmButtonText: "Ok",
        });
      }
    });
  }

  login(token, secret_word) {
    fireAuth
      .signInWithCustomToken(token)
      .then(() => {
        game.getState(secret_word);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        swal({
          title: `Unsuccessfull Login`,
          text: `${errorMessage}`,
          type: "error",
          confirmButtonText: "Ok",
        });
      });
  }

  handleOnpress() {
    this.generateSecretWord.mousePressed(async () => {
      this.generateSecretWord.hide();
      secret_word = this.makeId(5);
      this.getToken(secret_word);
      this.message.html("Send your secret word to student !");
      this.secretWord.html(`Secret Word = ${secret_word}`);
      this.message.show();
      this.secretWord.show();
      this.nameInput.show();
      this.playButton.show();

      this.nameInput.position(width / 2.3, height / 2 - 120);
      this.playButton.position(width / 2.3, height / 2 - 60);
    });

    this.playButton.mousePressed(async () => {
      if (this.nameInput.value() === "" || !secret_word) {
        return;
      }

      this.hideElements();
      player.name = this.nameInput.value();
      await player.join();
      this.greeting.html("Hello " + player.name);
      this.greeting.show();
      this.greeting.position(width / 2 - 70, height / 4);

      this.greeting2.html("Waiting for other players to join ....");
      this.greeting2.show();
      this.greeting2.position(width / 2.5, height / 3.2);

      this.secretWord.show();
      this.secretWord.position(width / 2.3, height / 2.5);
    });
  }

  display() {
    if (this.isDisplayed) {
      return;
    }
    this.generateSecretWord.show();
    this.setElementStyle();
    this.setElementPosition();
    this.handleOnpress();
    this.isDisplayed = true;
  }
}
