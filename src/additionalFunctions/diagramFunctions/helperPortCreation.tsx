/* eslint-disable guard-for-in */
import {
  DefaultNodeModel,
  DefaultPortModel,
} from '@projectstorm/react-diagrams';
type normalized = any;
type returned = any;
export function helperPortCreation(
  normal: normalized,
  node: DefaultNodeModel,
): returned {
  const ttt = Object.keys(normal['on']);
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
