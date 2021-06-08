export default function displayError(
  result: boolean | Record<string, any>,
): string {
  if (typeof result === 'boolean') {
    return '';
  }
  const len = result.length - 1;
  return `${result[len].message}` + ` on path: ${result[len].instancePath}`;
}
