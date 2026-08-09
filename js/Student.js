class Student {
  constructor() {
    this.secretWordInput = createInput("").attribute(
      "placeholder",
      "Enter your secret word"
    );

    this.nameInput = createInput("").attribute("placeholder", "Name");
    this.greeting = createElement("h2");
    this.greeting2 = createElement("h3");
    this.submitButton = createButton("Submit");
    this.playButton = createButton("Play");
    this.isDisplayed = false;
    this.secretWordInput.hide();
    this.nameInput.hide();
    this.greeting.hide();
    this.greeting2.hide();
    this.submitButton.hide();
    this.playButton.hide();
  }

  hideElements() {
    this.secretWordInput.hide();
    this.nameInput.hide();
    this.greeting.hide();
    this.greeting2.hide();
    this.submitButton.hide();
    this.playButton.hide();
  }

  setElementPosition() {
    this.secretWordInput.position(width / 2.3, height / 2 - 120);
    this.submitButton.position(width / 2.3, height / 2 - 60);
  }

  setElementStyle() {
    this.nameInput.class("customInput");
    this.secretWordInput.class("customInput");
    this.submitButton.class("customButton");
    this.playButton.class("customButton");
  }

  getToken(word) {
    var url = `https://us-central1-trial-car-racing-game.cloudfunctions.net/genrateToken?secret_word=${word}`;
    httpGet(url, "json", false, (response) => {
      if (response.success) {
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
    this.submitButton.mousePressed(async () => {
      if (this.secretWordInput.value() !== "") {
        this.secretWordInput.hide();
        this.submitButton.hide();
        secret_word = this.secretWordInput.value();
        this.getToken(secret_word);
        this.nameInput.show();
        this.playButton.show();
        this.nameInput.position(width / 2.3, height / 2 - 120);
        this.playButton.position(width / 2.3, height / 2 - 60);
      }
    });

    this.playButton.mousePressed(async () => {
      if (this.nameInput.value() !== "") {
        this.nameInput.hide();
        this.playButton.hide();
        player.name = this.nameInput.value();
        await player.join();
        this.greeting.html("Hello " + player.name);
        this.greeting.show();
        this.greeting.position(width / 2 - 70, height / 4);

        this.greeting2.html("Waiting for other players to join ....");
        this.greeting2.show();
        this.greeting2.position(width / 3, height / 3.2);
      }
    });
  }

  display() {
    if (this.isDisplayed) {
      return;
    }
    this.secretWordInput.show();
    this.submitButton.show();
    this.setElementStyle();
    this.setElementPosition();
    this.handleOnpress();
    this.isDisplayed = true;
  }
}
