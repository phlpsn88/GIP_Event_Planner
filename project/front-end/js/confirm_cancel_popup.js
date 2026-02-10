const cancelBtn = document.getElementById("cancelBtn");
const cancelModal = document.getElementById("cancelModal");
const stayBtn = document.getElementById("cancelCancel");
const confirmCancelBtn = document.getElementById("confirmCancel");

// Open modal
cancelBtn.addEventListener("click", () => {
  cancelModal.classList.add("show");
});

// Continue editing → close modal
stayBtn.addEventListener("click", () => {
  cancelModal.classList.remove("show");
});

// Confirm → redirect to overview
confirmCancelBtn.addEventListener("click", () => {
  window.location.href = "overview.html";
});
