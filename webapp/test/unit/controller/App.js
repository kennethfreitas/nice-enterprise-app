/*global QUnit*/

sap.ui.define(
  ["my/nice/app/controller/Home.controller"],
  function (oController) {
    "use strict";

    QUnit.module("App Controller");

    QUnit.test("I should test the controller", function (assert) {
      const oAppController = new oController();

      oAppController.onInit();
      assert.ok(oAppController);
    });
  }
);
