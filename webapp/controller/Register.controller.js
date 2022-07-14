sap.ui.define(
  ["my/nice/app/controller/Base.controller"],
  function (BaseController) {
    "use strict";

    return BaseController.extend("my.nice.app.controller.Register", {
      onInit() {
        this.refresh(this._onDisplay);
      },

      _onDisplay() {
        this.resetBasicProductModel();
      },
    });
  }
);
