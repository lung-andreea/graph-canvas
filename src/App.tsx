import React, { Fragment, useEffect, useRef } from "react";
import createEngine, { DiagramModel } from "@projectstorm/react-diagrams";

import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { CustomNodeModel } from "./components/CustomNode/CustomNodeModel";
import { CustomNodeFactory } from "./components/CustomNode/CustomNodeFactory";

import "./App.scss";
import useLocalStorage from "./utils/useLocalStorage/useLocalStorage";
import getRandomPosition from "./utils/getRandomPosition/getRandomPosition";
import AddForm from "./components/AddForm/AddForm";

const TRIGGER_SERIALIZATION_ACTIONS_MODEL = [
  "nodesUpdated",
  "entityRemoved",
  "gridUpdated",
];

const TRIGGER_SERIALIZATION_ACTIONS_NODES = [
  "positionChanged",
  "entityRemoved",
];

const TRIGGER_SERIALIZATION_ACTIONS_LINKS = [
  "sourcePortChanged",
  "targetPortChanged",
  "entityRemoved",
];

export default function App() {
  const [serializedModel, setSerializedModel] = useLocalStorage(
    "diagram-model",
    new DiagramModel().serialize()
  );
  const [mounted, setMounted] = useLocalStorage("mounted", false);

  const engineRef = useRef(createEngine());
  const engine = engineRef.current;
  engine.getNodeFactories().registerFactory(new CustomNodeFactory());

  const modelRef = useRef(new DiagramModel());
  const model = modelRef.current;
  model.deserializeModel(serializedModel, engine);

  useEffect(() => {
    model.getNodes().forEach((node) => {
      node.registerListener({
        eventDidFire: (ev) => {
          console.log("triggered");
          if (TRIGGER_SERIALIZATION_ACTIONS_NODES.includes(ev.function)) {
            setSerializedModel(model.serialize());
          }
        },
      });
    });
  }, []);

  useEffect(() => {
    const modelListener = model.registerListener({
      linksUpdated: (e) => {
        e.link.registerListener({
          eventDidFire: (ev) => {
            if (TRIGGER_SERIALIZATION_ACTIONS_LINKS.includes(ev.function)) {
              setSerializedModel(model.serialize());
            }
          },
        });
      },
      eventDidFire: (event) => {
        if (TRIGGER_SERIALIZATION_ACTIONS_MODEL.includes(event.function)) {
          setSerializedModel(model.serialize());
        }
      },
    });

    return () => {
      model.deregisterListener(modelListener);
    };
  }, []);

  engine.setModel(model);

  useEffect(() => {
    if (!mounted) {
      const startNode = new CustomNodeModel({
        name: "Initial",
        color: "#2ecc71",
      });
      startNode.setPosition(100, 300);
      model.addNode(startNode);
    }
    setMounted(true);
  }, []);

  const handleAddNode = (nodeName: string) => {
    const node = new CustomNodeModel({ color: "#e67e22", name: nodeName });
    const nodePos = getRandomPosition();
    node.setPosition(nodePos.x, nodePos.y);
    model.addNode(node);
    engine.repaintCanvas();
  };

  return (
    <Fragment>
      <AddForm handleFormSubmit={handleAddNode} />
      <CanvasWidget className="canvas" engine={engine} />
    </Fragment>
  );
}
