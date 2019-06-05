/* Toggle menu when user clicks on button */
function dropdown() {
  document.getElementById("dropdown-content").classList.toggle("show");
}

/* Close menu when user clicks beside menu */
window.onclick = function(e) {
  if(!e.target.matches(".dropbtn")) {
    var dropdown = document.getElementByClassName("dropdown-content");
    for(var i = 0; i < dropdown.length; i++) {
      var openDropdown = dropdown[i];
      if(openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
}


