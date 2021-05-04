/* eslint-disable @typescript-eslint/no-namespace */
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

export interface DemoCanvasWidgetProps {
  color?: string;
  background?: string;
}

namespace S {
  export const Container = styled.div<{ color: string; background: string }>`
    height: 100%;
    background-color: ${p => p.background};
    background-size: 50px 50px;
    display: flex;

    > * {
      height: 100%;
      min-height: 100%;
      width: 100%;
    }

    background-image: linear-gradient(0deg, ${p => p.color}),
      linear-gradient(90deg, ${p => p.color});
  `;

  export const Expand = css`
    html,
    body,
    #root {
      height: 100%;
    }
  `;
}

export class DemoCanvasWidget extends React.Component<DemoCanvasWidgetProps> {
  render() {
    return (
      <>
        <Global styles={S.Expand} />
        <S.Container
          background={this.props.background || 'rgb(60, 60, 60)'}
          color={this.props.color || 'rgba(255,255,255, 0.05)'}
        >
          {this.props.children}
        </S.Container>
      </>
    );
  }
}
