sap.ui.define(
  ["my/nice/app/model/models", "sap/ui/Device"],
  function (models, Device) {
    "use strict";

    function isPhoneTestCase(assert, bIsPhone) {
      this.stub(Device, "system", { phone: bIsPhone });

      this.oDeviceModel = models.createDeviceModel();

      assert.strictEqual(
        this.oDeviceModel.getData().system.phone,
        bIsPhone,
        "IsPhone property is correct"
      );
    }

    function isTouchTestCase(assert, bIsTouch) {
      this.stub(Device, "support", { touch: bIsTouch });

      this.oDeviceModel = models.createDeviceModel();

      assert.strictEqual(
        this.oDeviceModel.getData().support.touch,
        bIsTouch,
        "IsTouch property is correct"
      );
    }

    QUnit.module("createDeviceModel", {
      afterEach() {
        this.oDeviceModel.destroy();
      },
    });

    QUnit.test(
      "Should initialize a device model for desktop",
      function (assert) {
        isPhoneTestCase.call(this, assert, false);
      }
    );

    QUnit.test("Should initialize a device model for phone", function (assert) {
      isPhoneTestCase.call(this, assert, true);
    });

    QUnit.test(
      "Should initialize a device model for non touch devices",
      function (assert) {
        isTouchTestCase.call(this, assert, false);
      }
    );

    QUnit.test(
      "Should initialize a device model for touch devices",
      function (assert) {
        isTouchTestCase.call(this, assert, true);
      }
    );

    QUnit.test(
      "The binding mode of the device model should be one way",
      function (assert) {
        this.oDeviceModel = models.createDeviceModel();

        assert.strictEqual(
          this.oDeviceModel.getDefaultBindingMode(),
          "OneWay",
          "Binding mode is correct"
        );
      }
    );
  }
);
