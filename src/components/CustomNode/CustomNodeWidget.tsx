import * as React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { CustomNodeModel } from "./CustomNodeModel";
export interface CustomNodeWidgetProps {
  node: CustomNodeModel;
  engine: DiagramEngine;
}

export interface CustomNodeWidgetState {}

export class CustomNodeWidget extends React.Component<
  CustomNodeWidgetProps,
  CustomNodeWidgetState
> {
  constructor(props: CustomNodeWidgetProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="custom-node">
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("in") || undefined}
        >
          <div className="circle-port" />
        </PortWidget>
        <div
          className="custom-node-color"
          style={{ backgroundColor: this.props.node.color }}
        >
          {this.props.node.name}
        </div>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("out") || undefined}
        >
          <div className="circle-port" />
        </PortWidget>
      </div>
    );
  }
}
