sap.ui.define(
  [
    "sap/ui/test/opaQunit",
    "../pages/Browser",
    "../pages/Home",
    // "../pages/NotFound",
    "../pages/ProductDetail",
    "../pages/Register",
  ],
  (opaTest) => {
    "use strict";

    QUnit.module("Product Journey");

    opaTest("Should add a new product", function (Given, When, Then) {
      Given.iStartMyApp();
      Then.onTheHomePage.iShouldSeeTheHomePage();

      When.onTheHomePage.iPressAddProduct();
      Then.onTheRegisterPage.iShouldSeeAnEditableForm();

      When.onTheRegisterPage.iFillTheProductFormAndSaveIt();
      Then.onTheHomePage.iShouldSeeTheHomePage();

      Then.iTeardownMyApp();
    });

    opaTest("Should delete a product", function (Given, When, Then) {
      Given.iStartMyApp();
      Then.onTheHomePage.iShouldSeeTheHomePage();

      When.onTheHomePage.iPressInTheFirstProductAtTable();
      Then.onTheProductDetailPage.iShouldSeeTheProductDetailPage();

      When.onTheProductDetailPage.iPressTheEditButton();
      Then.onTheProductDetailPage.iShouldSeeTheProductNameEditable();

      When.onTheProductDetailPage
        .iPressTheDeleteButton()
        .and.iSeeTheConfirmationDialogIClickOk();
      Then.onTheHomePage.iShouldSeeTheHomePage();

      Then.iTeardownMyApp();
    });

    opaTest(
      "Should load more products and go into a invalid hash and back to the home",
      function (Given, When, Then) {
        Given.iStartMyApp();
        Then.onTheHomePage.iShouldSeeTheHomePage();

        When.onTheBrowser.iGoToInvalidHash();
        Then.onTheBrowser.iShouldSeeTheNotFoundPage();
        When.onTheBrowser.iCleanTheHistory();

        When.onTheBrowser.iPressTheBackNavButton();
        Then.onTheHomePage.iShouldSeeTheHomePage();

        Then.iTeardownMyApp();
      }
    );
  }
);
