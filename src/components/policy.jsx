import React, { useEffect } from "react";
import $ from "jquery";

const KEY_POLICY = "accept_plocy";

const Policy = () => {
  const showModal = () => {
    $("#policy").modal({
      show: true,
      backdrop: "static",
      keyboard: false,
    });
  };

  const hideModal = () => {
    $("#policy").modal({
      show:false,
      backdrop: false,
    });

    $("#policy").modal("hide");
  };

  const checkUserAcceptPolicy = () => {
    if (localStorage.getItem(KEY_POLICY)) {
      hideModal();
    } else {
      showModal();
    }
  };

  const acceptPolicy = async () => {
    await localStorage.setItem(KEY_POLICY, JSON.stringify(true));
    hideModal();
  };

  useEffect(() => {
    $("document").ready(function () {
      checkUserAcceptPolicy();
    });
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="policy"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Terms of use
              </h5>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={acceptPolicy}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Policy;
