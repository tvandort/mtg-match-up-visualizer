export function createKey(pairing: string[]) {
  const inOrder = pairing.map((player) => player.trim()).sort();
  return `(${inOrder[0]}, ${inOrder[1]})`;
}
