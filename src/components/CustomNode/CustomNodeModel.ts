import {
  NodeModel,
  DefaultPortModel,
  NodeModelGenerics,
  ListenerHandle,
} from "@projectstorm/react-diagrams";
import { BaseModelOptions } from "@projectstorm/react-canvas-core";
import { Component } from "react";

export interface CustomNodeModelOptions extends BaseModelOptions {
  color?: string;
  name?: string;
  icon?: Component | any;
}

export class CustomNodeModel extends NodeModel {
  color: string;
  name: string;
  icon: Component;

  constructor(options: CustomNodeModelOptions = {}) {
    super({
      ...options,
      type: "custom-node",
    });
    this.color = options.color || "green";
    this.name = options.name || "";
    this.icon = options.icon || null;

    // setup an in and out port
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
      color: this.color,
      name: this.name,
    };
  }

  deserialize(event: any): void {
    super.deserialize(event);
    this.color = event.data.color;
    this.name = event.data.name;
  }
}
