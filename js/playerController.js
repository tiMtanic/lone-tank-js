class PlayerController {
  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;

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
    this.boundHandleMouse1Down = this.handleMouse1Down.bind(this);
    this.boundHandleMouse1Up = this.handleMouse1Up.bind(this);
    this.boundHandleMousePosition = this.handleMousePosition.bind(this);
  }

  registerListeners() {
    window.addEventListener("keydown", this.boundHandleKeyDown);
    window.addEventListener("keyup", this.boundHandleKeyUp);
    window.addEventListener("mousedown", this.boundHandleMouse1Down);
    window.addEventListener("mouseup", this.boundHandleMouse1Up);
    window.addEventListener("mousemove", this.boundHandleMousePosition)
  }

  unregisterListeners() {
    window.removeEventListener("keydown", this.boundHandleKeyDown);
    window.removeEventListener("keyup", this.boundHandleKeyUp);
    window.removeEventListener("mousedown", this.boundHandleMouse1Down);
    window.removeEventListener("mouseup", this.boundHandleMouse1Up);
    window.removeEventListener("mousemove", this.boundHandleMousePosition)
  }

  handleKeyDown(event) {
    event.preventDefault();

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

  handleMouse1Down(event) {
    if (event.button === 0 && !this.mouseKeys["Mouse1"].isPressed) {
      this.mouseKeys["Mouse1"].isPressed = true;

      if (this.mouseKeys["Mouse1"].onPressed) {
        this.mouseKeys["Mouse1"].onPressed();
      }
    }
  }

  handleMouse1Up(event) {
    if (event.button === 0 && this.mouseKeys["Mouse1"].isPressed) {
      this.mouseKeys["Mouse1"].isPressed = false;

      if (this.mouseKeys["Mouse1"].onReleased) {
        this.mouseKeys["Mouse1"].onReleased();
      }
    }
  }

  setMouseAction(action, callback) {
    this.mouseKeys.Mouse1[action] = callback;
  }

  setKeyboardAction(keyboardKey, action, callback) {
    this.keyboardKeys[keyboardKey][action] = callback;
  }

  handleMousePosition(event) {
    event.preventDefault();

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  handleTurretRotation(player) {
    const playerNodePosition = getAbsolutePositionCenter(player.node);

    const v1 = [playerNodePosition[0], playerNodePosition[1]];
    const v2 = this.getMousePosition();
    const angleDeg = Math.atan2(v2[1] - v1[1], v2[0] - v1[0]) * 180 / Math.PI + 90;

    player.currentAimAngle = normalizeAngle(angleDeg);
    player.turretNode.style.transform = "rotate(" + (player.currentAimAngle - player.currentMovementAngle) + "deg)";
    player.lookDirection = getNormalizedDirectionVector(playerNodePosition, this.getMousePosition());
  }

  getMousePosition() {
    return [this.mouseX, this.mouseY];
  }
}