// 요소(태그) 가져오기
const editBtn = document.getElementById("edit-btn"); // HTML 문서에서 아이디가 'edit-btn'인 요소를 찾아 'editBtn'이라는 변수에 저장합니다. (프로필 수정 버튼)
const profileName = document.getElementById("profile-name"); // 프로필 이름(닉네임)이 표시되는 태그를 찾아서 변수에 저장합니다.
const profileId = document.getElementById("profile-id"); // 사용자 아이디(@username 등)가 표시되는 태그를 찾아서 변수에 저장합니다.

// 프로필 수정 버튼 클릭 시 실행할 함수
editBtn.addEventListener("click", function () {
  // 저장해둔 'editBtn'을 사용자가 클릭(click)했을 때, 괄호 안의 내용(함수)을 실행하도록 이벤트를 걸어줍니다.

  // 1. 새로운 닉네임 입력받기
  const newName = prompt(
    // 브라우저에서 제공하는 기본 입력창(prompt)을 화면에 띄워 사용자에게 텍스트를 입력받습니다.
    "새로운 닉네임을 입력하세요:", // 입력창 위에 띄울 안내 메시지입니다.
    profileName.textContent, // 입력창의 기본값으로 현재 화면에 적혀있는 기존 닉네임을 미리 채워둡니다.
  );

  // 취소 버튼을 누르지 않고 무언가 입력했을 때만 변경
  if (newName !== null && newName.trim() !== "") {
    // 사용자가 '취소'를 누르지 않았고(null이 아님), 양옆 공백을 지웠을 때 빈칸이 아닐 경우에만 통과시킵니다.
    profileName.textContent = newName; // 위 조건을 통과했다면, 사용자가 새로 입력한 이름(newName)으로 화면에 표시된 이름(textContent)을 바꿔줍니다.

    // 2. 새로운 아이디 입력받기
    let newId = prompt(
      // 닉네임을 성공적으로 바꿨다면, 이어서 새로운 아이디를 입력받는 창을 띄웁니다. (뒤에서 @를 붙이기 위해 값이 변할 수 있으므로 const 대신 let을 사용합니다.)
      "새로운 아이디를 입력하세요 (예: @username):", // 두 번째 입력창 안내 메시지입니다.
      profileId.textContent, // 현재 아이디를 기본값으로 채워둡니다.
    );

    if (newId !== null && newId.trim() !== "") {
      // 닉네임 때와 마찬가지로 취소를 누르지 않고 내용을 잘 입력했는지 확인합니다.

      // 입력할 때 @를 빼고 입력해도 자동으로 붙여주는 센스 코드
      if (!newId.startsWith("@")) {
        // 사용자가 입력한 새 아이디(newId)의 맨 앞이 '@' 문자로 시작하지 않는지(!) 검사합니다.
        newId = "@" + newId; // 만약 '@' 없이 입력했다면, 글자 맨 앞에 자동으로 '@'를 붙여서 덮어씌워 줍니다.
      }

      profileId.textContent = newId; // 최종적으로 예쁘게 다듬어진 아이디로 화면에 표시된 아이디를 바꿔줍니다.
    }
  }
});
