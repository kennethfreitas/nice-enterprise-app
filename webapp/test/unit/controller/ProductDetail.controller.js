/*global QUnit*/

sap.ui.define(
  ["my/nice/app/controller/ProductDetail.controller"],
  function (ProductDetailController) {
    "use strict";

    QUnit.module("ProductDetailController Tests", {
      beforeEach: function () {
        this.productDetail = new ProductDetailController();
        sinon.stub(this.productDetail, "navTo").returns(null);
      },

      afterEach: function () {
        this.productDetail.navTo.restore();
      },
    });

    QUnit.test("Should refresh the model", function (assert) {
      sinon.stub(this.productDetail, "refresh").returns(null);
      this.productDetail.onInit();

      assert.ok(this.productDetail.refresh.calledOnce);
      this.productDetail.refresh.restore();
    });

    QUnit.test("Should place the model", function (assert) {
      function getProperty(path) {
        if (path.includes("Supplier"))
          return {
            ID: 99,
            Name: "name supplier",
          };

        return {
          ID: 20,
          Name: "name",
          Price: "22.00",
          Description: "Nice",
        };
      }

      const updateModelSpy = sinon
        .stub(this.productDetail, "updateModel")
        .returns(null);
      const getPropertyStub = sinon
        .stub(this.productDetail, "getModel")
        .returns({ getProperty });

      this.productDetail._onDisplay({
        getParameter() {
          return { productId: 20 };
        },
      });

      assert.ok(updateModelSpy.calledOnce);
      getPropertyStub.restore();
    });

    QUnit.test(
      "Should open a dialog to confirm product exclusion",
      function (assert) {
        sinon.stub(this.productDetail, "openDialog").returns(null);
        this.productDetail.deleteProduct(99);

        assert.ok(this.productDetail.openDialog.calledOnce);
        this.productDetail.openDialog.restore();
      }
    );

    QUnit.test("Should delete a product", function (assert) {
      const getPropertyStub = sinon
        .stub(this.productDetail, "getModel")
        .returns({ remove() {} });

      this.productDetail._deleteProduct(99);

      assert.ok(this.productDetail.navTo.calledOnce);
      getPropertyStub.restore();
    });

    QUnit.test("Should enable product edition", function (assert) {
      const getModelDataStub = sinon
        .stub(this.productDetail, "getModelData")
        .returns({ editable: false });
      const updateModelSpy = sinon
        .stub(this.productDetail, "updateModel")
        .returns(null);

      this.productDetail.editProduct();

      assert.ok(updateModelSpy.calledWith("basicProduct", { editable: true }));
      updateModelSpy.restore();
      getModelDataStub.restore();
    });
  }
);
