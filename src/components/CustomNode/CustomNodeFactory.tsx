import * as React from 'react';
import {CustomNodeModel} from "./CustomNodeModel";
import { CustomNodeWidget } from './CustomNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class CustomNodeFactory extends AbstractReactFactory<CustomNodeModel, DiagramEngine> {
    constructor() {
        super('custom-node');
    }

    generateModel(initialConfig: any) {
        return new CustomNodeModel();
    }

    generateReactWidget(event: any): JSX.Element {
        return <CustomNodeWidget engine={this.engine as DiagramEngine} node={event.model} />;
    }
}
