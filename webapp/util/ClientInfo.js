sap.ui.define([], function () {
  "use strict";
  return {
    _request(method, path, body) {
      return new Promise((res, rej) => {
        $.ajax({
          url: `http://localhost:3000/api${path}`,
          data: body,
          method,
          contentType: "application/json",
        })
          .done((r) => res(r))
          .fail((xhr) => rej(xhr));
      });
    },
    async getClients() {
      return this._request("GET", "/clients?perPage=50");
    },
  };
});
