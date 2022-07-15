/*global QUnit*/

sap.ui.define(
  ["my/nice/app/controller/Register.controller"],
  function (RegisterController) {
    "use strict";

    QUnit.module("RegisterController Tests", {
      beforeEach: function () {
        this.register = new RegisterController();
        sinon.stub(this.register, "resetBasicProductModel").returns(null);
        sinon.stub(this.register, "refresh", this.register._onDisplay());
      },

      afterEach: function () {
        this.register.resetBasicProductModel.restore();
        this.register.refresh.restore();
      },
    });

    QUnit.test("Should reset the basic product model", function (assert) {
      this.register.onInit();

      assert.ok(this.register.resetBasicProductModel.calledOnce);
    });
  }
);
