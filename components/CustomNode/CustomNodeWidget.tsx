import * as React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { CustomNodeModel } from "./CustomNodeModel";

// import "./CustomNode.scss";

export interface CustomNodeWidgetProps {
  node: CustomNodeModel;
  engine: DiagramEngine;
  handleNodeMoved: () => void;
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
      <div className="custom-node" onMouseUp={this.props.handleNodeMoved}>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("in") || undefined}
        >
          <div className="circle-port" />
        </PortWidget>
        <div
          className="custom-node-body"
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
