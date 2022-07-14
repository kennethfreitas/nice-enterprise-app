sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "./model/models",
    "./controller/partial/Dialog",
  ],
  function (UIComponent, Device, models, Dialog) {
    "use strict";

    return UIComponent.extend("my.nice.app.Component", {
      metadata: {
        manifest: "json",
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init() {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // this.getModel().setUseBatch(false);

        // set the device model
        this.setModel(models.createDeviceModel(), "device");

        // create the views based on the url/hash
        this.getRouter().initialize();

        // set dialog
        this._dialog = new Dialog();
      },

      openDialog(title, callback) {
        this._dialog.open(title, callback);
      },
    });
  }
);
