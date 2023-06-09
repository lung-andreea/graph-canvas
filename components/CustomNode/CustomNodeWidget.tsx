import * as React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { CustomNodeModel } from "./CustomNodeModel";

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
    const selectedClassname = this.props.node.isSelected()
      ? "custom-node--selected"
      : "";

    return (
      <div
        className={`custom-node ${selectedClassname}`}
        onMouseUp={this.props.handleNodeMoved}
      >
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("in") || undefined}
        >
          <div className="inner-port" />
        </PortWidget>
        <div className="custom-node-body">{this.props.node.name}</div>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("out") || undefined}
        >
          <div className="inner-port" />
        </PortWidget>
      </div>
    );
  }
}
