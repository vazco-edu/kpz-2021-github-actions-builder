import React from 'react';

export default function dependencyObject(
  notNormalized: any,
  normalized: any,
  isNeededFor: Record<string, string[]>,
) {
  if (normalized) {
    const key: string[] = Object.keys(normalized.jobs);
    for (const jobName of key) {
      isNeededFor[`${jobName}`] = [];
    }
    // ## loop used to add dependencies to our object (isNeededFor)
    for (let job = 0; job < key.length; job++) {
      for (let nod = 0; nod < key.length; nod++) {
        if (normalized['jobs'][`${key[job]}`].needs) {
          for (const element of normalized['jobs'][`${key[job]}`].needs) {
            if (element === key[nod]) {
              isNeededFor[`${key[nod]}`].push(`${key[job]}`);
            }
          }
        }
      }
    }
    return isNeededFor;
  }
  return isNeededFor;
}
