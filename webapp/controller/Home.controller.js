sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/formatter",
  ],
  function (Controller, Filter, FilterOperator, formatter) {
    "use strict";

    return Controller.extend("my.nice.app.controller.Home", {
      formatter: formatter,

      onInit() {},

      onFilterProducts(oEvent) {
        const sQuery = oEvent.getParameter("query");
        const oTable = this.getView().byId("productsTable");
        const oBinding = oTable.getBinding("items");

        oBinding.filter([new Filter("Name", FilterOperator.Contains, sQuery)]);
      },
    });
  }
);
