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

    return BaseController.extend("my.nice.app.controller.ProductForm", {
      async onInit() {
        this.getMessageMenager(this.getView());

        this._oInput = this.getView().byId("supllierInput");
        const clients = await ClientInfo.getClients();

        this.setModel(TABLE_COLS_MODEL, {
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

        this.setModel(CLIENTS_MODEL, clients.items);
      },

      onSelectClient(event) {
        const description = event.getParameters().selectedItem.getText();
        this.updateModel(PRODUCT_MODEL, { description });
      },

      handleSavePress() {
        const newProduct = this.getModelData(PRODUCT_MODEL);
        console.log(newProduct);
        const randomID = Math.round(Math.random() * 1000000);

        const odata = {
          ID: newProduct.id || randomID.toString(),
          Name: newProduct.name,
          Description: newProduct.description,
          Price: Number(newProduct.price).toFixed(2),
          ReleaseDate: new Date(),
          DiscontinuedDate: new Date(),
          Rating: "5",
          Supplier: {
            __metadata: {
              uri: `/Suppliers(${
                this._oInput.getSelectedKey() || newProduct.supplierId
              })`,
            },
          },
        };

        const properties = {
          headers: {
            "Content-ID": randomID,
          },
        };

        if (newProduct.id) {
          this.getModel().update(
            `/Products(${newProduct.id})`,
            odata,
            properties
          );
        } else {
          this.getModel().create("/Products", odata, properties);
        }

        this.resetBasicProductModel();
        this.navTo("home");
      },

      async onValueHelpRequested() {
        const oColModel = this.getModel(TABLE_COLS_MODEL);
        const cols = oColModel.getData().cols;

        const oFragment = await Fragment.load({
          name: "my.nice.app.view.fragment.SupplierValueHelp",
          controller: this,
        });

        this._oValueHelpDialog = oFragment;
        this.getView().addDependent(this._oValueHelpDialog);

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

        this.updateModel(PRODUCT_MODEL, {
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
