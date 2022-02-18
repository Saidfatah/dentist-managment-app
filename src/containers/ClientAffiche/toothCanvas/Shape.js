import React, { useEffect, useRef } from "react";
import { shapeSchema } from "../../../store/models/clients/client.schema";
import { Icon } from "../../../components";

const SHAPE_SIZE = 35;
const Shape = ({
  shapeName,
  left,
  top,
  angle = 0,
  id,
  isEditState,
  isFromboard,
  setShapes,
  shapes,
}) => {
  const shapeRef = useRef();

  useEffect(() => {
    if (!shapeRef.current) return;
  }, [left, angle, top]);

  let shapeIcon = <Icon size={30} classes=" text-red-500" name={shapeName} />;
  if (shapeName === "E")
    shapeIcon = (
      <span className="text-red text-red-500  text-2xl font-bold cursor-pointer ">
        E
      </span>
    );

  const onRemoveShape = (e) => {
    console.log("remove shape");
    e.stopPropagation();
    const newShapes = [...shapes].filter(({ id: _id }) => _id !== id);
    setShapes(newShapes);
  };

  return (
    <div
      ref={shapeRef}
      onClick={() => {
        if (isFromboard) {
          const newShape = shapeSchema(shapeName, 50, 50);
          setShapes([newShape, ...shapes]);
        }
      }}
      style={{
        transform: `rotate(${angle}deg)`,
        left,
        top,
        width: SHAPE_SIZE,
        height: SHAPE_SIZE,
        zIndex: 999,
        marginRight: isFromboard ? 16 : 0,
        marginBottom: 0,
        position: isFromboard ? "static" : "absolute",
      }}
      className={
        "  bg-red flex justify-center items-center relative " +
        (isFromboard ? "  shadow-sm border-2 rounded-md " : " ")
      }
      id={"SHAPE_" + id}
    >
      {!isFromboard && isEditState ? (
        <div
          id={"ROTATE_HANDLER" + id}
          style={{
            top: -6,
            left: -6,
          }}
          className=" w-fit h-fit shadow-md bg-white rounded-lg  absolute "
        >
          <Icon
            name="ROTATE"
            id={"ROTATE_HANDLER_ICON" + id}
            classes=" text-blue-500"
            size={15}
          />
        </div>
      ) : null}
      {!isFromboard && isEditState ? (
        <div
          onClick={onRemoveShape}
          id={"CLOSE_HANDLER" + id}
          style={{
            top: -6,
            right: -6,
            zIndex: 9999,
          }}
          className=" w-fit h-fit shadow-md bg-white rounded-lg  absolute "
        >
          <Icon name="CLOSE" classes=" text-red-500" size={15} />
        </div>
      ) : null}
      <div
        style={{
          zIndex: 99,
        }}
        className=" text-red-500"
      >
        {shapeName === ""}
      </div>
      {shapeIcon}
    </div>
  );
};

export default Shape;
