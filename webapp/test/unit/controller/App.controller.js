/*global QUnit*/

sap.ui.define(["my/nice/app/controller/App.controller"], function (Controller) {
  "use strict";

  QUnit.module("App Controller");

  QUnit.test("I should test the app controller", function (assert) {
    const oAppController = new Controller();
    oAppController.onInit();
    assert.ok(oAppController);
  });
});
