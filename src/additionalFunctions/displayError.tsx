/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export default function displayError(
  result: boolean | Record<string, any>,
): string {
=======
export default function displayError(result: any) {
>>>>>>> c37a684 (jkd)
=======
export default function displayError(result: any): string {
>>>>>>> cffd6e5 (normalization separated)
=======
export default function displayError(
  result: boolean | Record<string, any>,
): string {
>>>>>>> dfe409a (Added diagrams, dagrejs and first steps with lexer.)
  if (typeof result === 'boolean') {
    return '';
  }
  const len = result.length - 1;
  return `${result[len].message}` + ` on path: ${result[len].instancePath}`;
}
