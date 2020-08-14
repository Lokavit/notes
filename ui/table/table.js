(function () {
  "use strict";

  function getUserId(target) {
    return target.closest("[data-userid]").dataset.userid;
  }

  function handleClick(evt) {
    var { action } = evt.target.dataset;

    if (action) {
      let userId = getUserId(evt.target);

      if (action == "edit") {
        alert(`Edit user with ID of ${userId}`);
      } else if (action == "delete") {
        alert(`Delete user with ID of ${userId}`);
      } else if (action == "select") {
        alert(`Selected user with ID of ${userId}`);
      }
    }
  }

  window.addEventListener("click", handleClick);
})();
