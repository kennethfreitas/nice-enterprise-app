sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
  ],
  function (Controller, History, UIComponent, JSONModel, formatter) {
    "use strict";

    const ERROR_MESSAGES_MODEL = "errorMessages";

    return Controller.extend("my.nice.app.controller.Base", {
      formatter: formatter,

      getModel(modelName) {
        if (!modelName) return this.getView().getModel();
        return this.getView().getModel(modelName);
      },

      getModelData(modelName) {
        return this.getModel(modelName).getData();
      },

      setModel(modelName, data) {
        return this.getView().setModel(new JSONModel(data), modelName);
      },

      updateModel(modelName, changes) {
        const model = this.getModel(modelName);
        const data = model.getData();

        if (Array.isArray(data)) model.setData(data);
        else model.setData({ ...data, ...changes });
      },

      getI18nText(key) {
        return this.getView().getModel("i18n").getResourceBundle().getText(key);
      },

      navTo(path, params) {
        this.getRouter().navTo(path, params);
      },

      getRouter() {
        return UIComponent.getRouterFor(this);
      },

      refresh(callback) {
        this.getRouter().attachRouteMatched(callback, this);
      },

      resetBasicProductModel() {
        this.updateModel("basicProduct", {
          id: "",
          name: "",
          price: 0,
          description: "",
          supplierId: "",
          supplierName: "",
          editable: true,
        });
      },

      getMessageMenager(oView) {
        const oMessageManager = sap.ui.getCore().getMessageManager();
        oMessageManager.registerObject(oView, true);
        oView.setModel(oMessageManager.getMessageModel(), ERROR_MESSAGES_MODEL);

        return oMessageManager;
      },

      openDialog(title, callback) {
        this.getOwnerComponent().openDialog(title, callback);
      },

      onNavBack() {
        const previousHash = History.getInstance().getPreviousHash();

        if (!previousHash) window.history.back();
        else this.getRouter().navTo("home", {}, true);
      },
    });
  }
);
