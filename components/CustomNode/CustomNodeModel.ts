import { NodeModel, DefaultPortModel } from "@projectstorm/react-diagrams";
import { BaseModelOptions } from "@projectstorm/react-canvas-core";

export interface CustomNodeModelOptions extends BaseModelOptions {
  name?: string;
}

export class CustomNodeModel extends NodeModel {
  name: string;

  constructor(options: CustomNodeModelOptions = {}) {
    super({
      ...options,
      type: "custom-node",
    });
    this.name = options.name || "";

    this.addPort(
      new DefaultPortModel({
        in: true,
        name: "in",
      })
    );
    this.addPort(
      new DefaultPortModel({
        in: false,
        name: "out",
      })
    );
  }

  serialize() {
    return {
      ...super.serialize(),
      name: this.name,
    };
  }

  deserialize(event: any): void {
    super.deserialize(event);
    this.name = event.data.name;
  }
}
