sap.ui.define(["sap/ui/test/Opa5"], function (Opa5) {
  "use strict";

  Opa5.createPageObjects({
    onTheAppPage: {
      actions: {},

      assertions: {
        iShouldSeeTheApp() {
          this.waitFor({
            id: "app",
            viewName: "App",
            success() {
              Opa5.assert.ok(true, "The App view is displayed");
            },
            errorMessage: "Did not find the App view",
          });
        },
      },
    },
  });
});
