const fileInput = document.getElementById("file-input");
const previewContainer = document.getElementById("preview-container");
const photoCountDisplay = document.getElementById("photo-count");
const btnSubmit = document.getElementById("btn-submit");

const captionInput = document.getElementById("caption-input");
const charCounter = document.getElementById("char-counter");

const tagInput = document.getElementById("tag-input");
const autocomplete = document.getElementById("autocomplete");
const tagList = document.getElementById("tag-list");

const btnLocation = document.getElementById("btn-location");
const locationText = document.getElementById("location-text");

const btnCancel = document.getElementById("btn-cancel");
const modalCancel = document.getElementById("modal-cancel");
const btnModalClose = document.getElementById("btn-modal-close");
const btnModalConfirm = document.getElementById("btn-modal-confirm");
const modalLoading = document.getElementById("modal-loading");

let photoCount = 0;

function checkSubmitState() {
  if (photoCount > 0) {
    btnSubmit.disabled = false;
    btnSubmit.classList.add("active");
  } else {
    btnSubmit.disabled = true;
    btnSubmit.classList.remove("active");
  }
  photoCountDisplay.innerText = photoCount;
}

fileInput.addEventListener("change", function (e) {
  const files = Array.from(e.target.files);

  files.forEach((file) => {
    if (photoCount >= 5) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const div = document.createElement("div");
      div.className = "photo-item";
      div.innerHTML = `
                        <img src="${event.target.result}" alt="미리보기">
                        <button class="btn-delete-photo">✕</button>
                    `;
      previewContainer.appendChild(div);
      photoCount++;
      checkSubmitState();

      div
        .querySelector(".btn-delete-photo")
        .addEventListener("click", function () {
          div.remove();
          photoCount--;
          checkSubmitState();
        });
    };
    reader.readAsDataURL(file);
  });
  fileInput.value = "";
});

captionInput.addEventListener("input", function () {
  const length = this.value.length;
  charCounter.innerText = `${length}/300`;
});

tagInput.addEventListener("input", function () {
  if (this.value.includes("#")) {
    autocomplete.classList.add("show");
  } else {
    autocomplete.classList.remove("show");
  }
});

function addTag(text) {
  let cleanText = text.trim();
  if (!cleanText.startsWith("#")) cleanText = "#" + cleanText;
  if (cleanText === "#") return;

  const span = document.createElement("span");
  span.className = "tag-chip";
  span.innerHTML = `${cleanText} ✕`;

  span.addEventListener("click", function () {
    span.remove();
  });

  tagList.appendChild(span);
}

tagInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    if (this.value) {
      addTag(this.value);
      this.value = "";
      autocomplete.classList.remove("show");
    }
  }
});

const autoItems = document.querySelectorAll(".auto-item");
autoItems.forEach((item) => {
  item.addEventListener("click", function () {
    addTag(this.innerText);
    tagInput.value = "";
    autocomplete.classList.remove("show");
  });
});

document.addEventListener("click", function (e) {
  if (!tagInput.contains(e.target) && !autocomplete.contains(e.target)) {
    autocomplete.classList.remove("show");
  }
});

btnLocation.addEventListener("click", function () {
  locationText.innerText = "대덕 소프트웨어 마이스터 고등학교";
  btnLocation.classList.add("active");
});

btnSubmit.addEventListener("click", function () {
  modalLoading.classList.add("show");
  setTimeout(() => {
    location.href = "/Main/Main.html";
  }, 1500);
});

btnCancel.addEventListener("click", function () {
  modalCancel.classList.add("show");
});

btnModalClose.addEventListener("click", function () {
  modalCancel.classList.remove("show");
});

btnModalConfirm.addEventListener("click", function () {
  location.href = "/Main/Main.html";
});
