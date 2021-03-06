import React from 'react';

type workflow = any;
export default function allJobsNeeds(
  normalized: workflow,
  isNeededFor: Record<string, string[]>,
) {
  if (normalized) {
    const key: string[] = Object.keys(normalized.jobs);
    const allJobs: string[] = [];
    // ## loop used to add dependencies to our object (isNeededFor)
    for (let job = 0; job < key.length; job++) {
      if (normalized['jobs'][`${key[job]}`].needs) {
        for (const element of normalized['jobs'][`${key[job]}`].needs) {
          if (!Object.keys(isNeededFor).includes(element)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  return false;
}
