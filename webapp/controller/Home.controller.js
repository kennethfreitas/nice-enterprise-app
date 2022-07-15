sap.ui.define(
  [
    "my/nice/app/controller/Base.controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (BaseController, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("my.nice.app.controller.Home", {
      onFilterProducts(oEvent) {
        const sQuery = oEvent.getParameter("query");
        const oTable = this.getView().byId("productsTable");
        const oBinding = oTable.getBinding("items");

        oBinding.filter([new Filter("Name", FilterOperator.Contains, sQuery)]);
      },

      openProduct(productId) {
        this.navTo("detail", { productId });
      },

      addProduct() {
        this.navTo("register");
      },
    });
  }
);
