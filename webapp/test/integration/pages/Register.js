sap.ui.define(
  [
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/actions/Press",
  ],
  function (Opa5, EnterText, Press) {
    "use strict";

    const viewName = "Register";

    Opa5.createPageObjects({
      onTheRegisterPage: {
        actions: {
          iFillTheProductFormAndSaveIt: function () {
            this.waitFor({
              id: "nameInput",
              viewName: "partial.ProductForm",
              actions: new EnterText({
                idSuffix: "inner",
                text: "test",
              }),
            });
            this.waitFor({
              id: "priceInput",
              viewName: "partial.ProductForm",
              actions: new EnterText({
                idSuffix: "inner",
                text: "1",
              }),
            });
            this.waitFor({
              id: "supllierInput",
              viewName: "partial.ProductForm",
              actions: new Press({
                idSuffix: "inner",
              }),
            });
            this.waitFor({
              id: "supplierValueHelp-table-rows-row0",
              searchOpenDialogs: true,
              actions: new Press({
                idSuffix: "col1",
              }),
            });
            this.waitFor({
              id: "save",
              viewName: "partial.ProductForm",
              actions: new Press({
                idSuffix: "inner",
              }),
            });
          },
        },
        assertions: {
          iShouldSeeAnEditableForm: function () {
            this.waitFor({
              id: "form",
              viewName: "partial.ProductForm",
              success: function (vControls) {
                var oControl = vControls[0] || vControls;
                Opa5.assert.ok(oControl.getEditable());
              },
            });
          },
        },
      },
    });
  }
);
