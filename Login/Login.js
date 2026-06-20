function showSignup() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
  document.getElementById("btn-login").classList.remove("active");
  document.getElementById("btn-signup").classList.add("active");
}

function showLogin() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("btn-login").classList.add("active");
  document.getElementById("btn-signup").classList.remove("active");
}

function handleLogin() {
  var idInput = document.getElementById("login-id");
  var pwInput = document.getElementById("login-pw");
  var loginBtn = document.getElementById("submit-login");

  if (idInput.value.trim() === "") {
    alert("아이디를 입력해주세요!");
    idInput.focus();
    return;
  }
  if (pwInput.value.trim() === "") {
    alert("비밀번호를 입력해주세요!");
    pwInput.focus();
    return;
  }

  loginBtn.classList.add("clicked");

  setTimeout(function () {
    window.location.href = "/Main/Main.html";
  }, 800);
}

function handleSignup() {
  var nameInput = document.getElementById("signup-name");
  var idInput = document.getElementById("signup-id");
  var telInput = document.getElementById("signup-tel");
  var pwInput = document.getElementById("signup-pw");
  var signupBtn = document.getElementById("submit-signup");

  if (nameInput.value.trim() === "") {
    alert("이름을 입력해주세요!");
    nameInput.focus();
    return;
  }
  if (idInput.value.trim() === "") {
    alert("아이디를 입력해주세요!");
    idInput.focus();
    return;
  }
  if (telInput.value.trim() === "") {
    alert("전화번호를 입력해주세요!");
    telInput.focus();
    return;
  }
  if (pwInput.value.trim() === "") {
    alert("비밀번호를 입력해주세요!");
    pwInput.focus();
    return;
  }

  signupBtn.classList.add("clicked");

  setTimeout(function () {
    alert("회원가입이 완료되었습니다!");
    window.location.href = "/Main/Main.html";
  }, 800);
}
