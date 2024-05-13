export function ms(duration: number): number {
  return typeof process === 'object' ? 0 : duration;
}
