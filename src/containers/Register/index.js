import React from "react";
import { connect } from "react-redux";
import RegisterTable from "./RegisterTable";
import { Heading, ActionButton, Icon } from "../../components";
import { colors, fontSizes } from "../../utils/values";

const RegisterContainer = ({ payments, showModal }) => {
  const textColor = "text" + colors.black + "hover:text" + colors.secondary;
  const textClasses = textColor + fontSizes.paragraph;
  const LinkClasses = textClasses;

  const onAddPaymentClick = () => showModal({ modal_id: "ADD_PAYMENT_MODAL" });
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2 ">
        <Heading title="Le register d'aujourdhui" />
        <ActionButton onClick={onAddPaymentClick} classes="p-2">
          <Icon name="ADD" classes="mr-2" />
          <p className={LinkClasses}>ajouter un payment</p>
        </ActionButton>
      </div>
      <RegisterTable payments={payments} />
    </div>
  );
};

export default connect(
  (state) => ({
    payments: state.register.payments,
  }),
  (dispatch) => ({
    showModal: dispatch.UI.showModal,
  })
)(RegisterContainer);
