function getNormalizedDirectionVector(from, to) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy);

  if (length === 0) {
    return [0, 0];
  }

  return [dx / length, dy / length];
}

function getAbsolutePosition(element) {
    const rect = element.getBoundingClientRect();
    return [rect.left, rect.top];
}

function getGameplayPosition(element) {
    const absolutePosition = getAbsolutePosition(element);
    absolutePosition[0] += element.offsetWidth / 2;
    absolutePosition[1] += element.offsetHeight / 2;
    return [absolutePosition[0] - gameplayContainerNode.offsetLeft, absolutePosition[1] - gameplayContainerNode.offsetTop];
}