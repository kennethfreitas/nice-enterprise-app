sap.ui.define(
  [
    "my/nice/app/controller/Base.controller",
    "my/nice/app/controller/control/ClientsTableHelp",
    "my/nice/app/model/modelNames"
  ],
  function (BaseController, ClientsTableHelp, ModelNames) {
    "use strict";
    const PRODUCT_MODEL = ModelNames.BASIC_PRODUCT_MODEL;

    return BaseController.extend("my.nice.app.controller.ProductForm", {
      onInit() {
        this.valueHelp = new ClientsTableHelp(this);
      },

      handleSavePress() {
        const newProduct = this.getModelData(PRODUCT_MODEL);
        const randomID = Math.round(Math.random() * 1000000);

        const odata = {
          ID: newProduct.id === null ? `${randomID}` : `${newProduct.id}`,
          Name: newProduct.name,
          Description: newProduct.description,
          Price: Number(newProduct.price).toFixed(2),
          ReleaseDate: new Date(),
          DiscontinuedDate: new Date(),
          Rating: "5",
          Supplier: {
            __metadata: {
              uri: `/Suppliers(${newProduct.supplierId})`,
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
        } else this.getModel().create("/Products", odata, properties);

        this.resetBasicProductModel();
        this.navTo("home");
      },

      async onValueHelpRequested() {
        await this.valueHelp.onValueHelpRequested();
      },
    });
  }
);
