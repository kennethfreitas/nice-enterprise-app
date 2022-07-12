sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
  (Controller, History) => {
    "use strict";

    return Controller.extend("my.nice.app.controller.NotFound", {
      onNavBack() {
        const previousHash = History.getInstance().getPreviousHash();

        if (!previousHash) window.history.back();
        else this.getRouter().navTo("home", {}, true);
      },
    });
  }
);
