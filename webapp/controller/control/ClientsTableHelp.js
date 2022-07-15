sap.ui.define(
  [
    "my/nice/app/controller/Base.controller",
    "sap/m/ColumnListItem",
    "sap/m/Label",
    "sap/m/Token",
    "sap/ui/core/Fragment",
    "my/nice/app/util/ClientInfo",
  ],
  function (
    BaseController,
    ColumnListItem,
    Label,
    Token,
    Fragment,
    ClientInfo
  ) {
    "use strict";

    const TABLE_COLS_MODEL = "tableCols";
    const CLIENTS_MODEL = "clients";
    const PRODUCT_MODEL = "basicProduct";

    return BaseController.extend("my.nice.app.controller.ClientsTableHelp", {
      constructor: function (oController) {
        this._oController = oController;

        this.getMessageMenager(this._oController.getView());

        this._oInput = this._oController.getView().byId("supllierInput");

        this._oController.setModel(TABLE_COLS_MODEL, {
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
        });

        ClientInfo.getClients().then((clients) =>
          this._oController.setModel(CLIENTS_MODEL, clients.items)
        );
      },

      onSelectClient(event) {
        const description = event.getParameters().selectedItem.getText();
        this._oController.updateModel(PRODUCT_MODEL, { description });
      },

      async onValueHelpRequested() {
        const oColModel = this._oController.getModel(TABLE_COLS_MODEL);
        const cols = oColModel.getData().cols;

        const oFragment = await Fragment.load({
          name: "my.nice.app.view.fragment.SupplierValueHelp",
          controller: this,
        });

        this._oValueHelpDialog = oFragment;
        this._oController.getView().addDependent(this._oValueHelpDialog);

        const oTable = await this._oValueHelpDialog.getTableAsync();
        oTable.setModel(oColModel, "columns");

        if (oTable.bindRows) oTable.bindAggregation("rows", "/Suppliers");

        if (oTable.bindItems) {
          oTable.bindAggregation(
            "items",
            "/Suppliers",
            () =>
              new ColumnListItem({
                cells: cols.map(
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

        this._oController.updateModel(PRODUCT_MODEL, {
          supplierId: this._oInput.getSelectedKey(),
          supplierName: this._oInput.getValue(),
        });
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
