/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import debounce from 'lodash.debounce';

import { workflow, normalizedObject } from '../components/App';
import createDiagram from '../diagrams/createDiagrams';

export const debouncedDiagrams = debounce(
  () => createDiagram(workflow, normalizedObject),
  2000,
);
