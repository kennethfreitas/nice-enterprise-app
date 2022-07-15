/*global QUnit*/

sap.ui.define(["my/nice/app/model/formatter"], function (formatter) {
  "use strict";

  QUnit.module("Formatters");

  QUnit.test("I should return a formated phone", function (assert) {
    assert.equal(
      formatter.phoneFormat("55011999998888"),
      "+55 (011) 99999-8888"
    );
  });

  QUnit.test("I should return a formated location", function (assert) {
    assert.equal(formatter.locationFormat("São Paulo", "SP"), "São Paulo/SP");
  });
});
