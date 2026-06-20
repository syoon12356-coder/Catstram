function showSignup() { // '회원가입' 탭을 눌렀을 때 실행되는 함수입니다.
  document.getElementById("login-form").style.display = "none"; // 로그인 폼을 화면에서 숨깁니다.
  document.getElementById("signup-form").style.display = "block"; // 숨겨져 있던 회원가입 폼을 화면에 보여줍니다.
  document.getElementById("btn-login").classList.remove("active"); // 로그인 버튼에서 '활성화(active)' 스타일을 뺍니다.
  document.getElementById("btn-signup").classList.add("active"); // 회원가입 버튼에 '활성화(active)' 스타일을 더해 색을 진하게 만듭니다.
}

function showLogin() { // '로그인' 탭을 눌렀을 때 실행되는 함수입니다.
  document.getElementById("login-form").style.display = "block"; // 로그인 폼을 화면에 다시 보여줍니다.
  document.getElementById("signup-form").style.display = "none"; // 회원가입 폼을 화면에서 다시 숨깁니다.
  document.getElementById("btn-login").classList.add("active"); // 로그인 버튼에 '활성화(active)' 스타일을 더합니다.
  document.getElementById("btn-signup").classList.remove("active"); // 회원가입 버튼에서 '활성화(active)' 스타일을 뺍니다.
}

function handleLogin() { // 로그인 폼 안의 '로그인' 전송 버튼을 클릭했을 때 실행되는 함수입니다.
  var idInput = document.getElementById("login-id"); // HTML에서 아이디 입력칸을 찾아 변수에 저장합니다.
  var pwInput = document.getElementById("login-pw"); // HTML에서 비밀번호 입력칸을 찾아 변수에 저장합니다.
  var loginBtn = document.getElementById("submit-login"); // HTML에서 로그인 제출 버튼을 찾아 변수에 저장합니다.

  if (idInput.value.trim() === "") { // 입력된 아이디의 양쪽 공백을 없앤 후(trim), 완전히 비어있는지 확인합니다.
    alert("아이디를 입력해주세요!"); // 비어있다면 알림창(경고창)을 띄웁니다.
    idInput.focus(); // 사용자가 바로 글을 칠 수 있게 아이디 칸에 커서를 깜빡이게(포커스) 둡니다.
    return; 
  }
  if (pwInput.value.trim() === "") { // 입력된 비밀번호가 비어있는지 확인합니다.
    alert("비밀번호를 입력해주세요!"); // 비어있다면 알림창을 띄웁니다.
    pwInput.focus(); // 비밀번호 칸에 커서를 둡니다.
    return; 
  }

  // 위 검사(if문)를 무사히 통과했다면 정상적으로 입력했다는 뜻입니다.
  loginBtn.classList.add("clicked"); // 버튼에 'clicked' 클래스를 추가해 CSS에서 설정한 버튼 클릭 효과(커짐, 색 변경 등)를 발동시킵니다.

  setTimeout(function () { // 괄호 안의 코드를 지정된 시간만큼 기다렸다가 실행해 주는 타이머 함수입니다.
    window.location.href = "/Main/Main.html"; // 메인 화면(Main.html)으로 웹페이지를 이동시킵니다.
  }, 800); // 800은 0.8초를 의미합니다. 즉, 버튼 클릭 효과를 0.8초 동안 보여준 뒤에 페이지를 넘어갑니다.
}

function handleSignup() { // 회원가입 폼 안의 '회원가입' 전송 버튼을 클릭했을 때 실행되는 함수입니다.
  var nameInput = document.getElementById("signup-name"); // 이름 입력칸 요소 가져오기
  var idInput = document.getElementById("signup-id"); // 아이디 입력칸 요소 가져오기
  var telInput = document.getElementById("signup-tel"); // 전화번호 입력칸 요소 가져오기
  var pwInput = document.getElementById("signup-pw"); // 비밀번호 입력칸 요소 가져오기
  var signupBtn = document.getElementById("submit-signup"); // 회원가입 제출 버튼 요소 가져오기

  if (nameInput.value.trim() === "") { // 이름 칸이 비어있는지 확인
    alert("이름을 입력해주세요!");
    nameInput.focus();
    return;
  }
  if (idInput.value.trim() === "") { // 아이디 칸이 비어있는지 확인
    alert("아이디를 입력해주세요!");
    idInput.focus();
    return;
  }
  if (telInput.value.trim() === "") { // 전화번호 칸이 비어있는지 확인
    alert("전화번호를 입력해주세요!");
    telInput.focus();
    return;
  }
  if (pwInput.value.trim() === "") { // 비밀번호 칸이 비어있는지 확인
    alert("비밀번호를 입력해주세요!");
    pwInput.focus();
    return;
  }

  // 모든 칸을 잘 채웠다면 아래 코드가 실행됩니다.
  signupBtn.classList.add("clicked"); // 회원가입 버튼에 클릭 효과(CSS)를 적용합니다.

  setTimeout(function () { // 마찬가지로 일정 시간 기다렸다가 실행합니다.
    alert("회원가입이 완료되었습니다!"); // 가입이 완료되었다는 안내창을 띄웁니다.
    window.location.href = "/Main/Main.html"; // 안내창의 '확인'을 누르면 메인 화면으로 이동합니다.
  }, 800); // 버튼 눌림 효과를 볼 수 있도록 0.8초의 시간차를 둡니다.
}