import * as React from "react";
import { CustomNodeModel } from "./CustomNodeModel";
import { CustomNodeWidget } from "./CustomNodeWidget";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export class CustomNodeFactory extends AbstractReactFactory<
  CustomNodeModel,
  DiagramEngine
> {
  handleNodeMoved: () => void;

  constructor({ handleNodeMoved }) {
    super("custom-node");
    this.handleNodeMoved = handleNodeMoved;
  }

  generateModel(initialConfig: any) {
    return new CustomNodeModel();
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <CustomNodeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
        handleNodeMoved={this.handleNodeMoved}
      />
    );
  }
}
