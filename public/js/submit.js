document.addEventListener("DOMContentLoaded", () => {
  const formNew = document.querySelector(".new-form");
  const formDelete = document.querySelector("#deleteForm");
  const submitBtn = document.querySelector(".btn.add");
  const deleteBtn = document.querySelector(".btn.delete");

  // Handle New / Edit Form Submission
  if (formNew && submitBtn) {
    formNew.addEventListener("submit", (event) => {
      // Prevent disabling if required fields are missing
      if (!formNew.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        formNew.classList.add("was-validated");
        return;
      }

      // Form is valid and sending
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Uploading image...";
    });
  }

  // Handle Delete Form Submission
  if (formDelete && deleteBtn) {
    formDelete.addEventListener("submit", () => {
      // Delete forms typically have no input fields, so disable immediately on submit
      deleteBtn.disabled = true;
      deleteBtn.innerHTML = "Deleting image...";
    });
  }
});