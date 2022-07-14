sap.ui.define(
  ["my/nice/app/controller/Base.controller"],
  function (BaseController) {
    "use strict";

    const PRODUCT_MODEL = "basicProduct";

    return BaseController.extend("my.nice.app.controller.ProductDetail", {
      onInit() {
        this.refresh(this._onDisplay);
      },

      _onDisplay(event) {
        const { productId } = event.getParameter("arguments");
        if (!productId) return;

        const product = this.getModel().getProperty(`/Products(${productId})`);

        const supplier = this.getModel().getProperty(
          `/Products(${productId})/Supplier`
        );

        this.updateModel(PRODUCT_MODEL, {
          id: product.ID,
          name: product.Name,
          price: product.Price,
          description: product.Description,
          supplierId: supplier.ID,
          supplierName: supplier.Name,
          editable: false,
        });
      },

      deleteProduct(productId) {
        this.openDialog(`Delete product ${productId}?`, () =>
          this._deleteProduct(productId)
        );
      },

      _deleteProduct(productId) {
        const odataModel = this.getModel();
        odataModel.remove(`/Products(${productId})`, {
          headers: {
            "Content-ID": 1,
          },
        });
        this.navTo("home");
      },

      editProduct() {
        const { editable } = this.getModelData(PRODUCT_MODEL);
        this.updateModel(PRODUCT_MODEL, { editable: !editable });
      },
    });
  }
);
