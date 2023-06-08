import { Fragment, useEffect, useRef } from "react";
import createEngine, { DiagramModel } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";

import useLocalStorage from "../../utils/useLocalStorage/useLocalStorage";
import { CustomNodeFactory } from "../CustomNode/CustomNodeFactory";
import { CustomNodeModel } from "../CustomNode/CustomNodeModel";
import getRandomPosition from "../../utils/getRandomPosition/getRandomPosition";
import AddForm from "../../components/AddForm/AddForm";

const TRIGGER_SERIALIZATION_ACTIONS_MODEL = [
  "nodesUpdated",
  "entityRemoved",
  "gridUpdated",
];
const TRIGGER_SERIALIZATION_ACTIONS_LINKS = [
  "sourcePortChanged",
  "targetPortChanged",
  "entityRemoved",
];

const Home: React.FC = () => {
  const [serializedModel, setSerializedModel] = useLocalStorage(
    "diagram-model",
    new DiagramModel().serialize()
  );
  const [mounted, setMounted] = useLocalStorage("mounted", false);

  const engineRef = useRef(createEngine());
  const engine = engineRef.current;

  const handleNodeMoved = () => {
    console.log("serialized model node");
    setSerializedModel(model.serialize());
  };

  engine
    .getNodeFactories()
    .registerFactory(new CustomNodeFactory({ handleNodeMoved }));

  const modelRef = useRef(new DiagramModel());
  const model = modelRef.current;
  model.deserializeModel(serializedModel, engine);

  useEffect(() => {
    const modelListener = model.registerListener({
      linksUpdated: (e) => {
        e.link.registerListener({
          eventDidFire: (ev) => {
            if (TRIGGER_SERIALIZATION_ACTIONS_LINKS.includes(ev.function)) {
              console.log("serialized model link");
              setSerializedModel(model.serialize());
            }
          },
        });
      },
      eventDidFire: (e) => {
        if (TRIGGER_SERIALIZATION_ACTIONS_MODEL.includes(e.function)) {
          console.log("serialized model model", e.function);
          setSerializedModel(model.serialize());
        }
      },
    });

    return () => {
      model.deregisterListener(modelListener);
    };
  }, []);

  useEffect(() => {
    if (!mounted) {
      const startNode = new CustomNodeModel({
        name: "Initial",
      });
      startNode.setPosition(100, 300);
      model.addNode(startNode);
    }
    setMounted(true);
  }, []);

  engine.setModel(model);

  const handleAddNode = (nodeName: string) => {
    const node = new CustomNodeModel({ name: nodeName });
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
};

export default Home;
