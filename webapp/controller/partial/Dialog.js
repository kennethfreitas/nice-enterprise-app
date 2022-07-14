sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"],
  function (Controller, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("my.nice.app.controller.Dialog", {
      open(text, callback) {
        MessageBox.warning(text, {
          actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          emphasizedAction: MessageBox.Action.OK,
          onClose(sAction) {
            if (sAction === MessageBox.Action.OK) {
              callback();
              MessageToast.show("completed");
            }
          },
        });
      },
    });
  }
);
