sap.ui.define(
  ["sap/ui/core/mvc/Controller", "../model/formatter"],
  function (Controller, formatter) {
    "use strict";

    return Controller.extend("my.nice.app.controller.Home", {
      formatter: formatter,

      onInit() {},
    });
  }
);
