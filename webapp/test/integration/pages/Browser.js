sap.ui.define(
  ["sap/ui/test/Opa5", "sap/ui/test/actions/Press"],
  (Opa5, Press) => {
    "use strict";

    Opa5.createPageObjects({
      onTheBrowser: {
        actions: {
          iGoToInvalidHash() {
            this.waitFor({
              actions() {
                window.location.hash = "#invalid";
              },
            });
          },
          iCleanTheHistory() {
            this.waitFor({
              actions() {
                window.location.hash = null;
              },
            });
          },
          iPressTheBackNavButton() {
            this.waitFor({
              controlType: "sap.ui.core.Icon",
              properties: {
                src: {
                  regex: {
                    source: "nav\\-back",
                  },
                },
              },
              actions: new Press(),
            });
          },
        },
        assertions: {
          iShouldSeeTheNotFoundPage: function () {
            this.waitFor({
              viewName: "NotFound",
              id: "notFoundPage",
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
