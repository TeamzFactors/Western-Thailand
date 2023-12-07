// <!-- Open modal script -->
// Open modal by uniqueID
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}
  
// Close modal by uniqueID
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}
  
// Optional: Close the modal when clicking outside the modal content
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
};
