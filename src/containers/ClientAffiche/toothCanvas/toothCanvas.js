import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import mouthImage from "../../../images/mouth.png";
import { ActionButton, CancelButton } from "../../../components";
import Shape from "./Shape";

const recursiveDomSearch = (element) => {
  let targetElement = element;

  while (!targetElement.id || targetElement.id.indexOf("SHAPE_") < 0) {
    targetElement = targetElement.parentElement;
  }
  return targetElement;
};

const SHAPE_SIZE = 35;
const ToothCanvas = ({ updateShapes, client }) => {
  const [shapes, setShapes] = useState([]);
  const [isEditState, setisEditState] = useState(false);
  const isRotating = useRef(false);
  const lastAngle = useRef();
  const ref = useRef();
  const clickedShape = useRef(undefined);

  useEffect(() => {
    setShapes([...client.shapes]);
  }, [client.shapes]);

  const onMouseDown = (e) => {
    if (!isEditState) return;
    const isRotateTarget =
      e.target.id.indexOf("ROTATE_HANDLER") >= 0 ||
      e.target.id.indexOf("ROTATE_HANDLER_ICON") >= 0;

    let shapeToMove;
    if (isRotateTarget) {
      shapeToMove = recursiveDomSearch(e.target);
      isRotating.current = true;
    } else {
      shapeToMove = recursiveDomSearch(e.target);
    }

    if (shapeToMove) {
      clickedShape.current = shapeToMove;
    }
  };

  const onMouseMove = (e) => {
    if (!isEditState) return;
    if (!clickedShape.current) return;

    if (isRotating.current) {
      const currentY = e.pageY - ref.current.offsetTop;
      const currentX = e.pageX - ref.current.offsetLeft;
      const originX = clickedShape.current.offsetLeft + SHAPE_SIZE / 2;
      const originY = clickedShape.current.offsetTop + SHAPE_SIZE / 2;

      const angle = Math.atan2(currentX - originX, currentY - originY);
      const degree = (angle * (180 / Math.PI) + 100) * -1;

      lastAngle.current = degree;
      clickedShape.current.style.transform = `rotate(${degree}deg)`;
    } else {
      clickedShape.current.style.top = `${
        e.pageY - 16 - ref.current.offsetTop
      }px`;
      clickedShape.current.style.left = `${
        e.pageX - 16 - ref.current.offsetLeft
      }px`;
    }
  };

  const onMouseUp = (e) => {
    if (!isEditState) return;
    if (!clickedShape.current) return;

    isRotating.current = false;

    const targetShape = shapes.filter(
      ({ id }) => id == clickedShape.current.id.slice(6)
    )[0];

    let top = e.pageY - 16 - ref.current.offsetTop;
    let left = e.pageX - 16 - ref.current.offsetLeft;

    if (top > 300) top = 300 - 25;
    if (left > ref.offsetWidth) left = ref.offsetWidth - 25;

    if (targetShape) {
      if (lastAngle.current) {
        targetShape.angle = lastAngle.current;
        if (targetShape.top !== clickedShape.current.offsetTop)
          targetShape.top = top;
        if (targetShape.left !== clickedShape.current.offsetLeft)
          targetShape.left = left;
      } else {
        targetShape.top = top;
        targetShape.left = left;
      }
      setShapes(shapes);
    }
    clickedShape.current = undefined;
  };

  const onCancelEdit = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };
  const onSave = () => {
    updateShapes({ shapes });
    setisEditState(false);
  };
  const onEnterEditMode = () => {
    setisEditState(true);
  };

  return (
    <div className="bg-white  shadow-md mb-2 rounded-lg overflow-hidden border-2   border-gray-200 p-2">
      <div
        ref={ref}
        style={{
          height: 300,
          width: "100%",
        }}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        className="relative bg-green-300 rounded-md overflow-hidden"
      >
        {shapes.map(({ left, top, angle, shapeName, id }) => (
          <Shape
            key={id}
            {...{
              left,
              isEditState,
              top,
              angle,
              shapeName,
              id,
              shapes,
              setShapes,
            }}
          />
        ))}
        <img
          src={mouthImage}
          alt="_mouthImage"
          style={{
            zIndex: 99,
          }}
          className=" w-full h-full absolute top-0 left-0 pointer-events-none "
        />
      </div>
      {isEditState && (
        <div className="w-full flex flex-wrap py-2">
          {["BRACKET", "RIGHT_ARROW", "CLOSE", "E"].map((shapeName) => (
            <Shape {...{ shapes, setShapes, shapeName, isFromboard: true }} />
          ))}
        </div>
      )}
      {isEditState ? (
        <div className="mt_2">
          <ActionButton classes="gap-0 p-2 " onClick={onSave}>
            <p className="mr-2 text-sm">Sauvgarder </p>
          </ActionButton>
          <CancelButton classes="gap-0 p-2 " onClick={onCancelEdit}>
            <p className="mr-2 text-sm">Annuller </p>
          </CancelButton>
        </div>
      ) : (
        <div className="mt-2">
          <ActionButton classes="gap-0 p-2 " onClick={onEnterEditMode}>
            <p className="mr-2 text-sm">Modifier </p>
          </ActionButton>
        </div>
      )}
    </div>
  );
};

export default connect(null, ({ clients: { updateShapes } }) => ({
  updateShapes,
}))(ToothCanvas);
