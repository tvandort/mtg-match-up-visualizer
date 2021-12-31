export function createKey(pairing: string[]) {
  const inOrder = pairing.sort();
  return `(${inOrder[0]}, ${inOrder[1]})`;
}
