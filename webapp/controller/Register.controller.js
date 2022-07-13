sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/ColumnListItem",
    "sap/m/Label",
    "sap/m/Token",
    "sap/ui/core/Fragment",
    "my/nice/app/util/ClientInfo",
  ],
  function (
    Controller,
    JSONModel,
    ColumnListItem,
    Label,
    Token,
    Fragment,
    ClientInfo
  ) {
    "use strict";

    const TABLE_COLS_MODEL = "tableCols";
    const NEW_PRODUCT_MODEL = "newProduct";
    const ERROR_MESSAGES_MODEL = "errorMessages";
    const CLIENTS_MODEL = "clients";

    return Controller.extend("my.nice.app.controller.Register", {
      async onInit() {
        this.getView().setModel(
          new JSONModel({
            name: "",
            price: 0,
            description: "",
          }),
          NEW_PRODUCT_MODEL
        );

        this._oMessageManager = sap.ui.getCore().getMessageManager();
        this._oMessageManager.registerObject(this.getView(), true);
        this.getView().setModel(
          this._oMessageManager.getMessageModel(),
          ERROR_MESSAGES_MODEL
        );

        this._oInput = this.getView().byId("supllierInput");

        this.oColModel = new JSONModel(
          {
            cols: [
              {
                label: "ID",
                template: "ID",
                width: "5rem",
              },
              {
                label: "Supplier",
                template: "Name",
              },
            ],
          },
          TABLE_COLS_MODEL
        );

        const clients = await ClientInfo.getClients();
        this.getView().setModel(new JSONModel(clients.items), CLIENTS_MODEL);
      },

      handleSavePress() {
        const randomID = Math.round(Math.random() * 1000000);
        const newProduct = this.getView().getModel(NEW_PRODUCT_MODEL).getData();
        const odata = {
          ID: `${newProduct.id || randomID}`,
          Name: newProduct.name,
          Description: newProduct.description,
          Price: Number(newProduct.price).toFixed(2),
          ReleaseDate: new Date(),
          DiscontinuedDate: new Date(),
          Rating: "5",
          Supplier: {
            __metadata: {
              uri: `/Suppliers(${this._oInput.getSelectedKey()})`,
            },
          },
        };

        const options = {
          headers: {
            "Content-ID": randomID,
          },
        };
        this.getView().getModel().create("/Products", odata, options);
        this.getOwnerComponent().getRouter().navTo("home");
      },

      async onValueHelpRequested() {
        const aCols = this.oColModel.getData().cols;

        const oFragment = await Fragment.load({
          name: "my.nice.app.view.fragment.SupplierValueHelp",
          controller: this,
        });

        this._oValueHelpDialog = oFragment;
        this.getView().addDependent(this._oValueHelpDialog);

        const oTable = await this._oValueHelpDialog.getTableAsync();
        oTable.setModel(this.oColModel, "columns");

        if (oTable.bindRows) oTable.bindAggregation("rows", "/Suppliers");

        if (oTable.bindItems) {
          oTable.bindAggregation(
            "items",
            "/Suppliers",
            () =>
              new ColumnListItem({
                cells: aCols.map(
                  (column) =>
                    new Label({
                      text: "{" + column.template + "}",
                    })
                ),
              })
          );
        }

        this._oValueHelpDialog.update();

        const oToken = new Token();
        oToken.setKey(this._oInput.getSelectedKey());
        oToken.setText(this._oInput.getValue());
        this._oValueHelpDialog.setTokens([oToken]);
        this._oValueHelpDialog.open();
      },

      onValueHelpOkPress(oEvent) {
        const [aTokens] = oEvent.getParameter("tokens");

        this._oInput.setSelectedKey(aTokens.getKey());
        this._oValueHelpDialog.close();
      },

      onValueHelpCancelPress() {
        this._oValueHelpDialog.close();
      },

      onValueHelpAfterClose() {
        this._oValueHelpDialog.destroy();
      },
    });
  }
);
