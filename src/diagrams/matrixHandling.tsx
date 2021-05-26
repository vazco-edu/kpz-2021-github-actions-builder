/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import createEngine, {
  DiagramModel,
  DefaultNodeModel,
  DefaultLinkModel,
} from '@projectstorm/react-diagrams';
import { normalizeId } from 'ajv/dist/compile/resolve';
import { ENGINE_METHOD_ALL } from 'node:constants';
import React from 'react';

import { normalizeMatrix } from '../additionalFunctions/normalization';
import { DemoCanvasWidget } from '../diagrams/CanvasWidget';

export default function matrixHandler(normalized: Record<string, any>) {
  if (normalized !== undefined) {
    const key: string[] = Object.keys(normalized.jobs);
    const matrixes: DefaultNodeModel[] = [];
    for (const jobName of key) {
      if (normalized.jobs[`${jobName}`]?.strategy?.matrix) {
        const combinations = normalizeMatrix(
          normalized.jobs[`${jobName}`]?.strategy?.matrix,
        );
        matrixes.push(
          new DefaultNodeModel({
            name: `${jobName} matrix`,
            color: 'rgb(219, 112, 147)',
          }),
        );
        for (const combination of combinations) {
          const entry = Object.entries(combination);
          const por: string[] = [];
          for (let i = 0; i < entry.length; i++) {
            por.push(` ${entry[i][0]} - ${entry[i][1]}`);
          }
          matrixes[matrixes.length - 1].addInPort(`[ ${por} ]`);
        }
      }
    }
    if (matrixes.length > 0) {
      const engine = createEngine();
      const model = new DiagramModel();
      model.addAll(...matrixes);
      engine.setModel(model);
      return (
        <DemoCanvasWidget>
          <CanvasWidget engine={engine} />
        </DemoCanvasWidget>
      );
    }
  }
  return '';
}
