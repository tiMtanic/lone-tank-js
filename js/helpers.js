function getNormalizedDirectionVector(from, to) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy);

  if (length === 0) {
    return [0, 0];
  }

  return [dx / length, dy / length];
}

function getAbsolutePositionCenter(element) {
    const rect = element.getBoundingClientRect();
    return [rect.left + rect.width / 2, rect.top + rect.height / 2];
}

function getGameplayPositionCenter(element) {
    const absolutePosition = getAbsolutePositionCenter(element);
    return [absolutePosition[0] - gameplayContainerNode.offsetLeft, absolutePosition[1] - gameplayContainerNode.offsetTop];
}

function directionFromDegrees(degrees) {
  const radians = degrees * Math.PI / 180;
  return [
    Math.sin(radians),
    -Math.cos(radians)
  ];
}

function rotationFromDirection([x, y]) {
    return Math.atan2(x, -y) * 180 / Math.PI;
}

function invertVector(vector) {
  return vector.map(a => -a);
}

function normalizeAngle(deg) {
    return ((deg % 360) + 360) % 360;
}