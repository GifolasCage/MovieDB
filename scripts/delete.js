function deleteEntry(itemId, type, title, view) {
  // Require confirmation before deletion
  let confirmation = confirm(
    `Are you sure you want to remove: "${title}" from favourites?`
  );
  if (!confirmation) {
    return;
  }
  fetch(`/deletefavourite/${itemId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        //If deleted remove the object from view.
        const button = document.getElementById(itemId);
        if (view === "table") {
          button.closest("tr").remove();
        }
        if (view === "poster") {
          window.location.reload();
        }
      } else {
        throw new Error("Error while deleting item");
      }
    })
    //Throw an error if error
    .catch((error) => {
      console.error("Error while deleting item:", error);
      alert("Error while deleting item. Please try again.");
    });
}
