// 1. HTML 요소(태그) 가져오기 및 변수 설정
const fileInput = document.getElementById("file-input"); // 사진 파일을 선택하는 input 태그
const previewContainer = document.getElementById("preview-container"); // 선택한 사진들의 미리보기가 들어갈 부모 박스
const photoCountDisplay = document.getElementById("photo-count"); // 현재 업로드된 사진 개수를 보여줄 텍스트 영역
const btnSubmit = document.getElementById("btn-submit"); // 게시물 등록(제출) 버튼

const captionInput = document.getElementById("caption-input"); // 본문 내용(글)을 입력하는 textarea 태그
const charCounter = document.getElementById("char-counter"); // 글자 수를 표시해주는 텍스트 영역

const tagInput = document.getElementById("tag-input"); // 해시태그를 입력하는 input 태그
const autocomplete = document.getElementById("autocomplete"); // 태그 입력 시 아래에 뜰 자동완성 추천 박스
const tagList = document.getElementById("tag-list"); // 완성된 태그 칩(알약 모양)들이 나열될 박스

const btnLocation = document.getElementById("btn-location"); // 위치 추가 버튼
const locationText = document.getElementById("location-text"); // 추가된 위치 이름이 표시될 텍스트 영역

const btnCancel = document.getElementById("btn-cancel"); // 작성 취소 버튼
const modalCancel = document.getElementById("modal-cancel"); // "정말 취소하시겠습니까?" 묻는 취소 확인 모달창
const btnModalClose = document.getElementById("btn-modal-close"); // 모달창 안의 '아니오(닫기)' 버튼
const btnModalConfirm = document.getElementById("btn-modal-confirm"); // 모달창 안의 '예(취소 확인)' 버튼
const modalLoading = document.getElementById("modal-loading"); // 등록 중일 때 빙글빙글 도는 로딩 모달창

let photoCount = 0; // 현재 사용자가 올린 사진의 개수를 기억하는 변수 (0에서 시작)

// 2. 상태 체크 함수 (사진 유무에 따른 등록 버튼 제어)
function checkSubmitState() {
  if (photoCount > 0) {
    // 올린 사진이 1장 이상 있다면
    btnSubmit.disabled = false; // 등록 버튼을 누를 수 있게 비활성화를 풉니다.
    btnSubmit.classList.add("active"); // 주황색 켜지는 CSS 클래스(active)를 추가합니다.
  } else {
    // 사진이 한 장도 없다면 (0장)
    btnSubmit.disabled = true; // 등록 버튼을 못 누르게 막습니다.
    btnSubmit.classList.remove("active"); // 주황색 불을 끕니다.
  }
  photoCountDisplay.innerText = photoCount; // 화면의 사진 개수 표시 숫자도 현재 개수로 업데이트합니다.
}

// 3. 사진 업로드 및 미리보기 관련 로직
fileInput.addEventListener("change", function (e) {
  // 사용자가 파일을 새로 선택했을 때 실행됩니다.
  const files = Array.from(e.target.files); // 선택된 파일들을 다루기 쉽게 진짜 배열 형태로 변환합니다.

  files.forEach((file) => {
    // 선택한 파일들을 하나씩 꺼내서 반복 처리합니다.
    if (photoCount >= 5) return; // 💡 만약 이미 사진이 5장 이상 등록되어 있다면, 더 이상 처리하지 않고 그냥 지나칩니다. (최대 5장 제한)

    const reader = new FileReader(); // 파일을 읽어올 파일 리더기 객체를 만듭니다.
    //사진을 서버에 먼저 올리고 그 주소를 받아와서 띄우는 것이 아니라, 사용자의 브라우저 단에서 파일을 즉시 읽어 들입니다.
    //메서드를 통해 실제 이미지 파일을 브라우저가 렌더링할 수 있는 긴 문자열(Data URL) 형태로 변환하여 화면에 바로 뿌려줍니다

    reader.onload = function (event) {
      // 리더기가 파일(이미지)을 성공적으로 다 읽었을 때 실행할 함수를 정의합니다.
      const div = document.createElement("div"); // 미리보기를 감싸줄 새로운 <div> 태그를 생성합니다.
      div.className = "photo-item"; // 생성한 태그에 'photo-item' 클래스명을 줍니다.
      div.innerHTML = `
        <img src="${event.target.result}" alt="미리보기">
        <button class="btn-delete-photo">✕</button>
      `; // 파일 읽은 결과(이미지 주소)를 img 태그에 넣고, 우상단에 띄울 X 버튼도 세트로 묶어서 HTML로 채웁니다.

      previewContainer.appendChild(div); // 만들어진 미리보기 박스를 화면(부모 박스)에 쏙 집어넣습니다.
      photoCount++; // 사진 개수를 1 늘립니다.
      checkSubmitState(); // 개수가 변했으니 등록 버튼 상태를 새로고침합니다.

      // 개별 사진 삭제 버튼 기능 구현
      div
        .querySelector(".btn-delete-photo") // 방금 만든 미리보기 박스 안에서 X 버튼을 찾습니다.
        .addEventListener("click", function () {
          // 그 X 버튼을 누르면
          div.remove(); // 해당 미리보기 박스 자체를 화면에서 완전히 지워버립니다.
          photoCount--; // 사진 개수를 1 줄입니다.
          checkSubmitState(); // 개수가 변했으니 버튼 상태를 다시 새로고침합니다.
        });
    };
    reader.readAsDataURL(file); // 리더기에게 실제 사진 파일을 읽어서 웹에서 쓸 수 있는 긴 주소(Data URL)로 바꾸라고 명령합니다.
  });
  fileInput.value = ""; //같은 사진을 지웠다가 다시 올릴 때도 정상 작동할 수 있도록 input 창의 파일 선택 기록을 싹 비워둡니다.
});

// =================================================================
// 4. 본문 글자 수 세기 로직
// =================================================================
captionInput.addEventListener("input", function () {
  // 사용자가 본문 입력창에 글자를 칠 때마다 실행됩니다.
  const length = this.value.length; // 현재 입력창에 적힌 전체 글자 길이를 잽니다.
  charCounter.innerText = `${length}/300`; // 화면 우측 하단에 '현재글자수/300' 형태로 표시합니다.
});

// 5. 해시태그 및 자동완성 로직
tagInput.addEventListener("input", function () {
  // 태그 입력창에 글자를 입력할 때마다 실행됩니다.
  if (this.value.includes("#")) {
    // 입력한 글자 중에 우물 정(#) 기호가 포함되어 있다면
    autocomplete.classList.add("show"); // 추천 태그 자동완성 박스를 화면에 보여줍니다.
  } else {
    // #이 없다면
    autocomplete.classList.remove("show"); // 자동완성 추천 박스를 숨깁니다.
  }
});

// 새로운 태그 칩을 만들어 화면에 추가해주는 함수
function addTag(text) {
  let cleanText = text.trim(); // 글자 양옆의 쓸데없는 공백을 지웁니다.
  if (!cleanText.startsWith("#")) cleanText = "#" + cleanText; // 만약 맨 앞에 #을 안 붙이고 썼다면 센스있게 자동으로 #을 붙여줍니다.
  if (cleanText === "#") return; // 내용 없이 #만 덜렁 적혀있다면 함수를 종료합니다.

  const span = document.createElement("span"); // 알약 모양의 태그 칩이 될 <span> 태그를 만듭니다.
  span.className = "tag-chip"; // 'tag-chip' 클래스명을 줍니다.
  span.innerHTML = `${cleanText} ✕`; // 태그 이름 뒤에 지울 수 있는 X 문자를 같이 넣습니다.

  span.addEventListener("click", function () {
    // 만들어진 태그 칩을 마우스로 클릭하면
    span.remove(); // 해당 태그 칩이 화면에서 삭제됩니다.
  });

  tagList.appendChild(span); // 최종 완성된 태그 칩을 태그 리스트 구역에 추가합니다.
}

// 엔터 키나 스페이스바를 누르면 태그를 완성시키는 로직
tagInput.addEventListener("keydown", function (e) {
  // 태그 입력창에서 키보드를 누를 때 작동합니다.
  if (e.key === "Enter" || e.key === " ") {
    // 누른 키가 '엔터'이거나 '스페이스바'라면
    e.preventDefault(); // 엔터칠 때 줄이 바뀌거나 페이지가 새로고침되는 기본 동작을 강제로 막습니다.
    if (this.value) {
      // 입력창에 무언가 글자가 적혀있다면
      addTag(this.value); // 위에서 만든 addTag 함수를 호출해 태그 칩으로 등록합니다.
      this.value = ""; // 태그를 등록했으니 입력창은 다시 깨끗하게 비웁니다.
      autocomplete.classList.remove("show"); // 자동완성 박스도 숨깁니다.
    }
  }
});

// 자동완성 목록에 있는 아이템을 마우스로 클릭했을 때의 로직
const autoItems = document.querySelectorAll(".auto-item"); // 자동완성 목록 안에 있는 모든 추천 태그 리스트를 찾습니다.
autoItems.forEach((item) => {
  // 각각의 추천 아이템들을 하나씩 꺼내 이벤트를 걸어줍니다.
  item.addEventListener("click", function () {
    // 추천 태그를 마우스로 클릭하면
    addTag(this.innerText); // 그 추천 태그에 적힌 글자 그대로 태그 칩을 추가합니다.
    tagInput.value = ""; // 태그 입력창은 비워줍니다.
    autocomplete.classList.remove("show"); // 자동완성 추천 창도 닫습니다.
  });
});

// 태그창 바깥의 아무 화면이나 클릭하면 자동완성 창이 닫히도록 하는 로직
document.addEventListener("click", function (e) {
  // 웹페이지 전체 중 아무 곳이나 클릭했을 때
  // 클릭한 대상(e.target)이 태그 입력창도 아니고, 자동완성 팝업창도 아니라면 (즉 완전히 바깥 공간을 눌렀다면)
  if (!tagInput.contains(e.target) && !autocomplete.contains(e.target)) {
    autocomplete.classList.remove("show"); // 자동완성 추천창을 살포시 닫아줍니다.
  }
});

// 6. 위치 추가 버튼 로직
btnLocation.addEventListener("click", function () {
  // 위치 추가 버튼을 누르면
  locationText.innerText = "대덕 소프트웨어 마이스터 고등학교"; // 위치 텍스트를 대소마고로 변경합니다!
  btnLocation.classList.add("active"); // 버튼 스타일을 활성화 상태(주황색 등)로 바꿉니다.
});

// 7. 등록 및 취소 모달창 제어 로직
// [등록] 버튼을 누를 때
btnSubmit.addEventListener("click", function () {
  modalLoading.classList.add("show"); // 빙글빙글 도는 로딩 모달창을 화면에 띄웁니다.
  setTimeout(() => {
    // 1.5초(1500ms) 동안 대기 시간을 줍니다 (업로드 중인 척 연출 효과)
    location.href = "/Main/Main.html"; // 1.5초 뒤 메인 화면 페이지로 이동시킵니다.
  }, 1500);
});

// [취소] 버튼을 누를 때
btnCancel.addEventListener("click", function () {
  modalCancel.classList.add("show"); // "정말 취소할 거니?" 모달창을 띄웁니다.
});

// 취소 모달창 안에서 [아니오(닫기)]를 누를 때
btnModalClose.addEventListener("click", function () {
  modalCancel.classList.remove("show"); // 모달창을 닫고 다시 작성하던 화면으로 돌아갑니다.
});

// 취소 모달창 안에서 [예(취소 확인)]를 누를 때
btnModalConfirm.addEventListener("click", function () {
  location.href = "/Main/Main.html"; // 작성을 파기하고 메인 화면 페이지로 바로 튕겨 보냅니다.
});
