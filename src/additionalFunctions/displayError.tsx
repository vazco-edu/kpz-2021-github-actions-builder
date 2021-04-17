/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

export default function displayError(
  result: boolean | Record<string, any>,
): string {
  if (typeof result === 'boolean') {
    return '';
  }
  const len = result.length - 1;
  for (let i = 0; i < result.length; ++i) {
    // eslint-disable-next-line no-console
    console.log(result[i]);
  }
  return `${result[len].message}` + ` on path: ${result[len].instancePath}`;
}
