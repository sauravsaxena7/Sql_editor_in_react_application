import React from "react";

const InputTextPopUp = ({ payloadChangeHandler, payload }) => {
  return (
    <div style={{ padding: "15px" }}>
      <input
        type="text"
        value={payload?.value}
        onChange={(e) => {
          payloadChangeHandler("value", e.target.value);
        }}
        placeholder={payload?.placeHolder}
        style={{
          borderColor: "#3498db",
          padding: "10px",
          fontSize: "13px",
          color: "#222",
          borderRadius: "6px",
          width: "100%",
        }}
      />
    </div>
  );
};

export default InputTextPopUp;
