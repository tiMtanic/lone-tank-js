function getNormalizedDirectionVector(from, to) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy);

  if (length === 0) {
    return [0, 0];
  }

  return [dx / length, dy / length];
}