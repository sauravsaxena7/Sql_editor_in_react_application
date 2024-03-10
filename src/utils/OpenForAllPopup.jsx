import  { useRef } from "react";
import "./table.css";
const OpenForAllPopUp = ({
  e,
  indexChangeHandler,
  Compnent,
  payload,
  payloadChangeHandler,
  setCompnent,
  simple = true,
}) => {
  const closeRef = useRef();
  return (
    <div
      className="modal fade"
      id="openForAll"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
        <div className="modal-content content-modal border-tr">
          <div className="modal-header header">
            <p className="modal-title" id="exampleModalLabel">
              {payload?.message}
            </p>
          </div>
          <div className="modal-body">
            {Compnent && (
              <Compnent
                payloadChangeHandler={payloadChangeHandler}
                payload={payload}
                closeRef={closeRef}
                indexChangeHandler={indexChangeHandler}
              />
            )}
          </div>
          <div
            className="modal-footer"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "-10px 0px 5px 0px", //top right bottowm left
              border: "none",
            }}
          >
            {simple === true && (
              <button
                type="submit"
                form='my-form'
                className="btn btn-primary me-3 haCancelOrderButton"
                style={{
                  width: "100px",
                  borderRadius: "10px",
                  backgroundColor: "#3498db",
                  borderColor: "#3498db",
                }}
                onClick={() => {
                  if(payload?.formType!=="form"){
                    indexChangeHandler(e,payload,closeRef);
                  }
                 
                }}
              >
                {payload?.yes ? payload?.yes : "SAVE"}
              </button>
            )}


            <button
              className="btn btn-danger haCancelOrderButton"
              aria-label="Close"
              ref={closeRef}
              data-bs-dismiss="modal"
              style={{ width: "100px", borderRadius: "10px" }}
              onClick={() => {
                setCompnent(null);
              }}
            >
              {payload?.no ? payload?.no : "CLOSE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenForAllPopUp;
