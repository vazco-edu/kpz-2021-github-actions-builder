import styled from '@emotion/styled';
import * as React from 'react';

export interface DemoWorkspaceWidgetProps {
  buttons?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >[];
}

export const Toolbar = styled.div`
  padding: 5px;
  display: flex;
  flex-shrink: 0;
`;

export const Content = styled.div`
  flex-grow: 1;
  height: 100%;
`;

export const Container = styled.div`
  background: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
`;

export const DemoButton = styled.button`
  background: rgb(60, 60, 60);
  font-size: 14px;
  padding: 5px 10px;
  border: none;
  color: white;
  outline: none;
  cursor: pointer;
  margin: 2px;
  border-radius: 3px;
  &:hover {
    background: rgb(0, 192, 255);
  }
`;

export class DemoWorkspaceWidget extends React.Component<DemoWorkspaceWidgetProps> {
  render() {
    return (
      <>
        <Container>
          <Toolbar>{this.props.buttons}</Toolbar>
          <Content>{this.props.children}</Content>
        </Container>
      </>
    );
  }
}
