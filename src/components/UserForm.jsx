//import React from "react";

const UserForm = ({payloadChangeHandler,payload,indexChangeHandler,closeRef}) => {
    const handleSaveChanges=(e)=>{
        e.preventDefault();
        console.log("lola payload",payload)
        e.target.className += " was-validated";
        if (e.target.checkValidity()){
            indexChangeHandler("","",closeRef)
        }
    }
  return (
    <div>
      <form id='my-form' onSubmit={handleSaveChanges} noValidate>
        <div className="fph-card-100">
          <div className="">
            {/* <p className="card-title"> Basic Information</p> */}
            <div>
            <div className="">
                <div className="mb-4">
                  <label className="form-label">
                    Enter User Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Username"
                    value={payload?.name}
                    onChange={(e) => payloadChangeHandler("name", e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Enter Email<span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={payload?.email}
                    onChange={(e) => payloadChangeHandler("email", e.target.value)}
                    
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Enter Phone<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    minLength={10}
                    className="form-control"
                    placeholder="Enter Phone Number"
                    value={payload?.phone}
                    onChange={(e) => payloadChangeHandler("phone", e.target.value)}
                    onKeyPress={(e) => {
                      const re = /[0-9]+/g;
                      if (!re.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Enter Password<span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Passowrd"
                    value={payload?.password}
                    disabled={payload?.case==="UPDATE_USER"}
                    onChange={(e) => payloadChangeHandler("password", e.target.value)}
                    
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
