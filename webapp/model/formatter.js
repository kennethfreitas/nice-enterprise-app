sap.ui.define([], function () {
  "use strict";
  return {
    phoneFormat(phone) {
      const global = phone.substring(0, 2);
      const ddd = phone.substring(2, 5);
      const phonePart1 = phone.substring(5, 10);
      const phonePart2 = phone.substring(10);

      return `+${global} (${ddd}) ${phonePart1}-${phonePart2}`;
    },
    locationFormat(city, state) {
      return `${city}/${state}`;
    },
  };
});
