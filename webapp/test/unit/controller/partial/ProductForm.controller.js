/*global QUnit*/

sap.ui.define(
  ["my/nice/app/controller/partial/ProductForm.controller"],
  function (ProductFormController) {
    "use strict";

    const basicProduct = {
      id: "",
      name: "Super name",
      price: "5",
      description: "Nice",
      supplierId: "1",
      supplierName: "Name",
    };

    QUnit.module("ProductFormController Tests", {
      beforeEach: function () {
        this.productForm = new ProductFormController();
        sinon.stub(this.productForm, "resetBasicProductModel").returns(null);
        sinon.stub(this.productForm, "navTo").returns(null);
      },

      afterEach: function () {
        this.productForm.navTo.restore();
        this.productForm.resetBasicProductModel.restore();
      },
    });

    QUnit.test("Should create a new product", function (assert) {
      sinon.stub(this.productForm, "getModelData").returns(basicProduct);
      const createStub = sinon
        .stub(this.productForm, "getModel")
        .returns({ create() {} });

      this.productForm.handleSavePress();

      assert.ok(createStub.calledOnce);
      assert.ok(this.productForm.resetBasicProductModel.calledOnce);
      assert.ok(this.productForm.navTo.calledOnce);
    });

    QUnit.test("Should update a product", function (assert) {
      basicProduct.id = 50;
      sinon.stub(this.productForm, "getModelData").returns(basicProduct);
      const updateStub = sinon
        .stub(this.productForm, "getModel")
        .returns({ update() {} });

      this.productForm.handleSavePress();

      assert.ok(updateStub.calledOnce);
      assert.ok(this.productForm.resetBasicProductModel.calledOnce);
      assert.ok(this.productForm.navTo.calledOnce);
    });
  }
);
