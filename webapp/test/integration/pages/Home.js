sap.ui.define(
  ["sap/ui/test/Opa5", "sap/ui/test/actions/Press"],
  function (Opa5, Press) {
    "use strict";

    const viewName = "Home";

    Opa5.createPageObjects({
      onTheHomePage: {
        actions: {
          iPressAddProduct: function () {
            this.waitFor({
              controlType: "sap.ui.core.Icon",
              viewName,
              properties: {
                src: {
                  regex: {
                    source: "add\\-document",
                  },
                },
              },
              actions: new Press(),
            });
          },
          iPressInTheFirstProductAtTable: function () {
            this.waitFor({
              controlType: "sap.m.ColumnListItem",
              viewName,
              properties: {
                type: "Active",
              },
              descendant: {
                controlType: "sap.m.ObjectIdentifier",
                bindingPath: {
                  path: "/Products(9)",
                  propertyPath: "Name",
                },
              },
              actions: new Press(),
            });
          },
          iPressLoadMore: function () {
            this.waitFor({
              id: "container-niceApp---home--productsTable-trigger",
              actions: new Press(),
            });
          },
        },

        assertions: {
          iShouldSeeTheHomePage: function () {
            this.waitFor({
              viewName,
              id: "homePage",
              success: function () {
                Opa5.assert.ok(true);
              },
            });
          },
        },
      },
    });
  }
);
