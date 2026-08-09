class Welcome {
  constructor() {
    this.logoImage =
      "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/logo.png";
    this.logo = createImg(this.logoImage);

    this.teacherButton = createButton("Teacher");
    this.studentButton = createButton("Student");
    this.isDisplayed = false;
  }

  hideElements() {
    this.logo.hide();
    this.teacherButton.hide();
    this.studentButton.hide();
  }

  setElementPosition() {
    this.logo.position(width / 3.2, 10);
    this.teacherButton.position(width / 2.3, height / 2 - 100);
    this.studentButton.position(width / 2.3, height / 2);
  }

  setElementStyle() {
    this.teacherButton.class("customButton");
    this.studentButton.class("customButton");
  }

  handleOnpress() {
    this.teacherButton.mousePressed(() => {
      this.hideElements();
      teacher.display();
    });

    this.studentButton.mousePressed(() => {
      this.hideElements();
      student.display();
    });
  }

  display() {
    if (this.isDisplayed) {
      return;
    }
    this.logo.show();
    this.teacherButton.show();
    this.studentButton.show();
    this.setElementStyle();
    this.setElementPosition();
    this.handleOnpress();
    this.isDisplayed = true;
  }
}
