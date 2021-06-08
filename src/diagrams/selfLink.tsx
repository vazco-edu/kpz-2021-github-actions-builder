export function selfLink(obj: Record<string, string[]>): boolean {
  for (let job = 0; job < Object.keys(obj).length; job++) {
    if (Object.values(obj)[job].includes(Object.keys(obj)[job])) {
      return true;
    }
  }
  return false;
}

export function allNeeds(obj: Record<string, string[]>, norm: any): boolean {
  if (norm !== undefined && Object.keys(obj).length !== 0) {
    const jobsInNormalized = Object.keys(norm.jobs);
    for (let job = 0; job < jobsInNormalized.length; job++) {
      if (norm['jobs'][jobsInNormalized[job]].needs === undefined) {
        return false;
      }
    }
    return true;
  }
  return false;
}

export function checkCycles(obj: Record<string, string[]>) {
  const graph2: Record<string, string[]> = Object.assign({}, obj);
  let queue: string[][] = Object.keys(graph2).map(node => [node]);
  while (queue.length) {
    const batch: string[][] = [];
    for (const path of queue) {
      const parents = graph2[path[0]] || [];
      for (const node of parents) {
        if (node === path[path.length - 1]) {
          batch.push([node, ...path]);
          return [true, batch[batch.length - 1]];
        }
        batch.push([node, ...path]);
      }
    }
    queue = batch;
  }
  return [false, []];
}
export function sameNeeds(obj: Record<string, string[]>) {
  const helperArray: string[][] = Object.values(obj);
  for (let valueArr = 0; valueArr < helperArray.length; valueArr++) {
    for (
      let elementOfValueArr = 0;
      elementOfValueArr < helperArray[valueArr].length;
      elementOfValueArr++
    ) {
      const result: number = helperArray[valueArr].filter(
        (v: any) => v === Object.keys(obj)[elementOfValueArr],
      ).length;
      if (result > 1) {
        return true;
      }
    }
  }
  return false;
}
