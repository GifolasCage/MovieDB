function deleteEntry(itemId, type, title) {
  let confirmation = confirm(`Are you sure you want to remove: "${title}" from favourites?`);
  if(!confirmation){
    return;
  }
    console.log(itemId + ", " + type + ", " + title);
    fetch(`/deletefavourite/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const button = document.getElementById(itemId);
          button.closest('tr').remove();
        } else {
          throw new Error('Error while deleting item');
        }
      })
      .catch((error) => {
        console.error('Error while deleting item:', error);
        alert('Error while deleting item. Please try again.');
      });
  }