sap.ui.define(
  [
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press",
    "sap/ui/test/actions/EnterText",
  ],
  function (Opa5, Press, EnterText) {
    "use strict";

    const viewName = "ProductDetail";

    Opa5.createPageObjects({
      onTheProductDetailPage: {
        actions: {
          iPressTheEditButton: function () {
            this.waitFor({
              controlType: "sap.ui.core.Icon",
              viewName,
              properties: {
                src: {
                  regex: {
                    source: "request",
                  },
                },
              },
              actions: new Press(),
            });
          },
          iPressTheDeleteButton: function () {
            return this.waitFor({
              controlType: "sap.ui.core.Icon",
              viewName,
              properties: {
                src: {
                  regex: {
                    source: "delete",
                  },
                },
              },
              actions: new Press(),
            });
          },
          iSeeTheConfirmationDialogIClickOk: function () {
            this.waitFor({
              controlType: "sap.m.Dialog",
              properties: {
                icon: "sap-icon://alert",
              },
              searchOpenDialogs: true,
            });

            this.waitFor({
              controlType: "sap.m.Button",
              properties: {
                text: "OK",
              },
              searchOpenDialogs: true,
              actions: new Press({
                idSuffix: "BDI-content",
              }),
            });
          },
        },

        assertions: {
          iShouldSeeTheProductDetailPage: function () {
            this.waitFor({
              viewName,
              id: "detailPage",
              success: function () {
                Opa5.assert.ok(true);
              },
            });
          },
          iShouldSeeTheProductNameEditable: function () {
            this.waitFor({
              id: "nameInput",
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
