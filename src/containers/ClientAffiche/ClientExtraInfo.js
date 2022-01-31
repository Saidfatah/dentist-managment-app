import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { animated, useSpring } from "react-spring";
import { ActionButton, CancelButton, Icon } from "../../components";

const INITIAL_HEIGHT = 487;
const COLLAPSED_HEIGHT = 60;
const CLientExtraInfo = ({ client, updateClientExtraInfo }) => {
  const [isEditState, setIsEditState] = useState(false);
  const [ClientExtraInfo, setClientExtraInfo] = useState({});
  const [height, setHeight] = useState(INITIAL_HEIGHT);
  const [updatedFields, setUpdatedFields] = useState({});
  const [canSubmit, setCanSubmit] = useState(true);
  const lastClientExtraInfo = useRef();

  const heightInterpolated = useSpring({
    height: height,
  });

  useEffect(() => {
    if (!client) return;
    const { extraInfo } = client;

    if (!extraInfo) return;
    const {
      healthProblems,
      anesthesia,
      péncilineAllergie,
      bleeding,
      pregnant,
      observation,
    } = extraInfo;

    setClientExtraInfo({
      healthProblems,
      anesthesia,
      péncilineAllergie,
      bleeding,
      pregnant,
      observation,
    });
  }, [client]);

  const setFormField = (field) => (e) => {
    if (!canSubmit) setCanSubmit(true);
    setUpdatedFields({ ...updatedFields, [field]: e.target.value });
    setClientExtraInfo({ ...ClientExtraInfo, [field]: e.target.value });
  };

  const {
    healthProblems,
    anesthesia,
    péncilineAllergie,
    bleeding,
    pregnant,
    observation,
  } = ClientExtraInfo;

  const ClientExtraInfoFooter = () => {
    if (isEditState)
      return (
        <div className="mt-2">
          <ActionButton
            classes="gap-0 p-2 "
            onClick={() => {
              setIsEditState(false);
              updateClientExtraInfo({ updatedFields });
            }}
          >
            <p className="mr-2 text-sm">Sauvgarder </p>
          </ActionButton>
          <CancelButton
            classes="gap-0 p-2 "
            onClick={() => {
              setIsEditState(false);
              console.log(lastClientExtraInfo.current);
              setClientExtraInfo({ ...lastClientExtraInfo.current });
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
            setIsEditState(true);
            console.log(ClientExtraInfo);
            lastClientExtraInfo.current = { ...ClientExtraInfo };
          }}
        >
          <p className="mr-2 text-sm">Modifier </p>
        </ActionButton>
      </div>
    );
  };

  let inputClass =
    " appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none   focus:border-blue-500";

  if (!isEditState) inputClass += "  border-white";
  return (
    <animated.div
      onClick={(e) => {
        if (e.target.id === "clientExtraInfoWrrapper")
          setHeight(
            height === INITIAL_HEIGHT ? COLLAPSED_HEIGHT : INITIAL_HEIGHT
          );
      }}
      id="clientExtraInfoWrrapper"
      style={{
        height: heightInterpolated.height,
      }}
      className="shadow-md rounded-lg cursor-pointer p-4 mb-2 border-2 border-gray-200 "
    >
      {height === INITIAL_HEIGHT ? (
        <div>
          <div>
            <span>Problems de sante :</span>
            <br />
            <input
              disabled={!isEditState}
              value={healthProblems}
              onChange={setFormField("healthProblems")}
              className={inputClass}
            />
          </div>
          <div>
            <span>Anesthesie local:</span>
            <br />
            <input
              disabled={!isEditState}
              value={anesthesia}
              onChange={setFormField("anesthesia")}
              className={inputClass}
            />
          </div>
          <div>
            <span>Alerigque au penciline:</span>
            <br />
            <input
              disabled={!isEditState}
              value={péncilineAllergie}
              onChange={setFormField("péncilineAllergie")}
              className={inputClass}
            />
          </div>
          <div>
            <span>Soigner vous :</span>
            <br />
            <input
              disabled={!isEditState}
              value={bleeding}
              onChange={setFormField("bleeding")}
              className={inputClass}
            />
          </div>
          <div>
            <span>Etes-vous enciente :</span>
            <br />
            <input
              disabled={!isEditState}
              value={pregnant}
              onChange={setFormField("pregnant")}
              className={inputClass}
            />
          </div>
          <div>
            <span>Etes-vous enciente :</span>
            <br />
            <textarea
              disabled={!isEditState}
              value={observation}
              onChange={setFormField("observation")}
              className={inputClass}
            />
          </div>

          <ClientExtraInfoFooter />
        </div>
      ) : (
        <p> Info extra du client</p>
      )}
    </animated.div>
  );
};

export default connect(null, (dispatch) => ({
  updateClientExtraInfo: dispatch.clients.updateClientExtraInfo,
}))(CLientExtraInfo);
