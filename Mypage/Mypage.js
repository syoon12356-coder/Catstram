// 요소(태그) 가져오기
const editBtn = document.getElementById("edit-btn");
const profileName = document.getElementById("profile-name");
const profileId = document.getElementById("profile-id");

// 프로필 수정 버튼 클릭 시 실행할 함수
editBtn.addEventListener("click", function () {
  // 1. 새로운 닉네임 입력받기
  const newName = prompt(
    "새로운 닉네임을 입력하세요:",
    profileName.textContent,
  );

  // 취소 버튼을 누르지 않고 무언가 입력했을 때만 변경
  if (newName !== null && newName.trim() !== "") {
    profileName.textContent = newName;

    // 2. 새로운 아이디 입력받기
    let newId = prompt(
      "새로운 아이디를 입력하세요 (예: @username):",
      profileId.textContent,
    );

    if (newId !== null && newId.trim() !== "") {
      // 입력할 때 @를 빼고 입력해도 자동으로 붙여주는 센스 코드
      if (!newId.startsWith("@")) {
        newId = "@" + newId;
      }
      profileId.textContent = newId;
    }
  }
});
