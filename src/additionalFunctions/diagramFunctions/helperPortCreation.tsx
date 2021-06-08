/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  DefaultNodeModel,
  DefaultPortModel,
} from '@projectstorm/react-diagrams';

export function helperPortCreation(normal: any, node: DefaultNodeModel): any {
  const ttt = Object.keys(normal['on']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const tt = normal['on'];
  const preventDuplicate: string[] = [];

  const port: DefaultPortModel = node.addOutPort(`on: ${ttt} `);
  if (typeof tt === 'object' || !Array.isArray(tt)) {
    for (const properties in tt) {
      if (tt[properties] !== null && Object.keys(tt[properties]).length !== 0) {
        if (preventDuplicate.length === 0) {
          node.addOutPort(`Branches: ${tt[properties]['branches']}`);
          preventDuplicate.push(tt[properties]['branches']);
        } else {
          for (let i = 0; i < preventDuplicate.length; ++i) {
            for (let j = 0; j < tt[properties]['branches'].length; ++j) {
              if (preventDuplicate[i][i] === tt[properties]['branches'][j]) {
                continue;
              } else {
                node.addOutPort(tt[properties]['branches'][j]);
              }
            }
          }
        }
      }
    }
    return [port, node];
  }
  return port;
}
