/** Pure gallery arithmetic, kept separate from server-side catalogue data. */
export function mediaIndex(index: number, delta: number, length: number) {
  return length ? (((index + delta) % length) + length) % length : 0;
}
