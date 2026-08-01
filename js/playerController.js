class PlayerController {
  constructor() {
    this.keyboardKeys = {
      "KeyW": { isPressed: false, onPressed: undefined, onReleased: undefined },
      "KeyA": { isPressed: false, onPressed: undefined, onReleased: undefined },
      "KeyS": { isPressed: false, onPressed: undefined, onReleased: undefined },
      "KeyD": { isPressed: false, onPressed: undefined, onReleased: undefined },
      "Space": { isPressed: false, onPressed: undefined, onReleased: undefined }
    };

    this.mouseKeys = {
      "Mouse1": { isPressed: false, onPressed: undefined, onReleased: undefined }
    };

    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleKeyUp = this.handleKeyUp.bind(this);
    this.boundHandleMouse1 = this.handleMouse1.bind(this);
  }

  registerListeners() {
    window.addEventListener("keydown", this.boundHandleKeyDown);
    window.addEventListener("keyup", this.boundHandleKeyUp);
    window.addEventListener("mousedown", this.boundHandleMouse1);
  }

  unregisterListeners() {
    window.removeEventListener("keydown", this.boundHandleKeyDown);
    window.removeEventListener("keyup", this.boundHandleKeyUp);
    window.removeEventListener("mousedown", this.boundHandleMouse1);
  }

  handleKeyDown(event) {
    for (let keyboardKey in this.keyboardKeys) {
      if (event.code === keyboardKey && !this.keyboardKeys[keyboardKey].isPressed) {
        this.keyboardKeys[keyboardKey].isPressed = true;

        if (this.keyboardKeys[keyboardKey].onPressed) {
          this.keyboardKeys[keyboardKey].onPressed();
        }
      }
    }
  }

  handleKeyUp(event) {
    for (let keyboardKey in this.keyboardKeys) {
      if (event.code === keyboardKey && this.keyboardKeys[keyboardKey].isPressed) {
        this.keyboardKeys[keyboardKey].isPressed = false;

        if (this.keyboardKeys[keyboardKey].onReleased) {
          this.keyboardKeys[keyboardKey].onReleased();
        }
      }
    }
  }

  handleMouse1(event) {
    if (event.button === 0) {
      this.mouseKeys.Mouse1.onPressed();
    }
  }

  setMouseAction(action, callback) {
    this.mouseKeys.Mouse1[action] = callback;
  }

  setKeyboardAction(keyboardKey, action, callback) {
    this.keyboardKeys[keyboardKey][action] = callback;
  }
}