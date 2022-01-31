import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import mouthImage from "../../images/mouth.png";
import { ActionButton, CancelButton } from "../../components";
import { shapeSchema } from "../../store/models/clients/client.schema";

const ToothCanvas = ({ updateShapes, client, getClientById }) => {
  const [shapes, setShapes] = useState([]);
  const [isEditState, setisEditState] = useState(false);
  const lastShapes = useRef();
  const ref = useRef();
  const clickedShape = useRef(undefined);

  useEffect(() => {
    setShapes([...client.shapes]);
  }, []);

  const onMouseDown = useCallback(
    (e) => {
      if (!isEditState) return;
      if (e.target.id.indexOf("SHAPE_") > -1) {
        clickedShape.current = e.target;
      }
    },
    [isEditState]
  );
  useEffect(() => {
    // get shapes from client
    if (!ref.current) return;
    ref.current.addEventListener("mousedown", onMouseDown);

    // eslint-disable-next-line no-unused-expressions
    () => {
      ref.current.removeEventListener("mousedown", onMouseDown);
    };
  }, [onMouseDown]);

  const onMouseMove = useCallback(
    (e) => {
      if (!isEditState) return;
      if (!clickedShape.current) return;
      clickedShape.current.style.top = `${
        e.pageY - 16 - ref.current.offsetTop
      }px`;
      clickedShape.current.style.left = `${
        e.pageX - 16 - ref.current.offsetLeft
      }px`;
    },
    [isEditState]
  );
  useEffect(() => {
    // get shapes from client
    if (!ref.current) return;

    ref.current.addEventListener("mousemove", onMouseMove);

    // eslint-disable-next-line no-unused-expressions
    () => {
      ref.current.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);

  const onMouseUp = (e) => {
    if (!isEditState) return;
    if (!clickedShape.current) return;
    const targetShape = shapes.filter(
      ({ id }) => id == clickedShape.current.id.slice(6)
    )[0];
    console.log(clickedShape.current.id.slice(6));
    let top = e.pageY - 16 - ref.current.offsetTop;
    let left = e.pageX - 16 - ref.current.offsetLeft;

    if (top > 300) top = 300 - 25;
    if (left > ref.offsetWidth) left = ref.offsetWidth - 25;

    if (targetShape) {
      console.log(targetShape);
      targetShape.top = top;
      targetShape.left = left;
      setShapes(shapes);
    }
    clickedShape.current = undefined;
  };

  const ToothCanvasFooter = () => {
    if (isEditState)
      return (
        <div className="mt_2">
          <ActionButton
            classes="gap-0 p-2 "
            onClick={() => {
              updateShapes({ shapes });
              setisEditState(false);
            }}
          >
            <p className="mr-2 text-sm">Sauvgarder </p>
          </ActionButton>
          <CancelButton
            classes="gap-0 p-2 "
            onClick={() => {
              setisEditState(false);
              // reset shapes to last state
              setShapes([...lastShapes.current]);
              lastShapes.current = undefined;
            }}
          >
            <p className="mr-2 text-sm">Annuller </p>
          </CancelButton>
        </div>
      );

    return (
      <div className="mt-2">
        <ActionButton
          classes="gap-0 p-2 "
          onClick={() => {
            setisEditState(true);
            lastShapes.current = [...shapes].map((shape) => ({ ...shape }));
          }}
        >
          <p className="mr-2 text-sm">Modifier </p>
        </ActionButton>
      </div>
    );
  };

  const Shape = ({ shapeName, left, top, id, isFromboard }) => {
    return (
      <div
        onClick={() => {
          if (isFromboard) {
            const newShape = shapeSchema(shapeName, 50, 50);
            setShapes([newShape, ...shapes]);
          }
        }}
        style={{
          left,
          top,
          width: 25,
          height: 25,
          zIndex: 999,
          marginRight: isFromboard ? 16 : 0,
          marginBottom: isFromboard ? 16 : 0,
          position: isFromboard ? "static" : "absolute",
        }}
        id={"SHAPE_" + id}
        className="bg-red-400 "
      ></div>
    );
  };

  const ShapesBoard = () => {
    if (!isEditState) return null;
    return (
      <div className="w-full flex flex-wrap p-2">
        <Shape shapeName="ARROW_RIGHT" isFromboard={true} />
        <Shape shapeName="ARROW_LEFT" isFromboard={true} />
        <Shape shapeName="ARROW_UP" isFromboard={true} />
        <Shape shapeName="ARROW_DOWN" isFromboard={true} />
        <Shape shapeName="X" isFromboard={true} />
      </div>
    );
  };

  return (
    <div className="bg-white  shadow-md mb-2 rounded-lg overflow-hidden border-2   border-gray-200 p-2">
      <div
        ref={ref}
        style={{
          height: 300,
          width: "100%",
        }}
        onMouseUp={onMouseUp}
        className="relative bg-orange-300 rounded-md overflow-hidden"
      >
        <img
          src={mouthImage}
          alt="_mouthImage"
          style={{
            zIndex: 99,
          }}
          className=" w-full h-full absolute top-0 left-0"
        />
        {shapes.map(({ left, top, shapeName, id }) => (
          <Shape {...{ left, top, shapeName, id }} />
        ))}
      </div>
      <ShapesBoard />
      <ToothCanvasFooter />
    </div>
  );
};

export default connect(null, ({ clients: { updateShapes } }) => ({
  updateShapes,
}))(ToothCanvas);
