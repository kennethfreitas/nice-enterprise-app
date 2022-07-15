/*global QUnit*/

sap.ui.define(
  ["my/nice/app/controller/Home.controller"],
  function (HomeController) {
    "use strict";

    QUnit.module("HomeController Tests", {
      beforeEach: function () {
        this.home = new HomeController();
        sinon.stub(this.home, "navTo").returns(null);
      },

      afterEach: function () {
        this.home.navTo.restore();
      },
    });

    QUnit.test("Should binding a filter", function (assert) {
      const filterStub = sinon.stub().returns({
        filter() {
          return {};
        },
      });

      sinon.stub(this.home, "getView").returns({
        byId() {
          return {
            getBinding() {
              return filterStub();
            },
          };
        },
      });

      this.home.onFilterProducts({
        getParameter() {
          return {};
        },
      });

      assert.ok(filterStub.calledOnce);
    });

    QUnit.test("Should nav to a product", function (assert) {
      this.home.openProduct("id");

      assert.ok(this.home.navTo.calledOnce);
    });

    QUnit.test("Should nav to register a product", function (assert) {
      this.home.addProduct();

      assert.ok(this.home.navTo.calledOnce);
    });
  }
);
