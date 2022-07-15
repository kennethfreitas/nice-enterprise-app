sap.ui.getCore().attachInit(function () {
  jQuery.sap.require("sap.ui.core.util.MockServer");
  const oMockServerOData = new sap.ui.core.util.MockServer({
    rootUri: "http://localhost:3000/odata/",
  });

  const metadataPath = sap.ui.require.toUrl(
    "my/nice/app/localService/metadata.xml"
  );

  oMockServerOData.simulate(metadataPath, {
    sMockdataBaseUrl: "mockdata",
    bGenerateMissingMockData: true,
  });

  const oMockServerApi = new sap.ui.core.util.MockServer({
    rootUri: "http://localhost:3000/api/",
    requests: [
      {
        method: "GET",
        path: /clients.+/,
        response(oXhr) {
          oXhr.respondJSON(
            200,
            {},
            {
              page: 1,
              totalPages: 1,
              perPage: 1,
              results: 1,
              items: [
                {
                  id: "1",
                  name: "Name",
                  company: "Company",
                  role: "Role",
                },
              ],
            }
          );
          return true;
        },
      },
    ],
  });

  oMockServerApi.start();
  oMockServerOData.start();
});
