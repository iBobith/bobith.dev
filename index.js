function navigate(diceBox) {
    if (diceBox === 'diceBox') {
        window.location.href = './realRoll/dice/diceBox.html';
    } else {
        // This is for other site changes.
    }
    // You can customize this function to perform specific actions when a button is clicked.
    alert("Navigating to " + section + " section.");
}

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.display = (sidebar.style.display === 'block') ? 'none' : 'block';
}
