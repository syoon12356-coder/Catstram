// 하단 네비게이션 바(메뉴바) 동적 생성 스크립트

// 웹페이지의 HTML 구조가 완전히 다 로딩된 후에 안전하게 이 안의 코드를 실행하라는 뜻입니다.
document.addEventListener("DOMContentLoaded", () => {
  // 현재 사용자가 접속해 있는 페이지의 주소(경로)를 가져옵니다. (예: "/Upload/Upload.html")
  const currentPath = window.location.pathname;

  // 1. 메뉴바에 들어갈 버튼들의 정보를 담은 리스트(배열)입니다.
  const navItems = [
    { name: "홈", path: "/Main/Main.html", iconClass: "ph-house" }, // 홈 버튼 정보 (이름, 이동할 경로, 아이콘 모양)
    {
      name: "업로드",
      path: "/Upload/Upload.html",
      iconClass: "ph-upload-simple",
    },
    { name: "map", path: "/map/map.html", iconClass: "ph-map-pin" }, // 지도 버튼 정보
    {
      name: "마이페이지",
      path: "/Mypage/Mypage.html",
      iconClass: "ph-user-circle",
    },
  ];

  // 2. 화면에 그려줄 HTML 태그를 문자열(글자)로 만들기 시작합니다. <nav> 태그로 엽니다.
  let navHTML = '<nav class="bottom-nav">';

  // 3. 위에서 만든 메뉴 정보 리스트(navItems)를 하나씩 꺼내서 반복 작업을 합니다.
  navItems.forEach((item) => {
    // 경로 비교 (파일명 기준)
    // 경로(예: /Main/Main.html)를 '/' 기준으로 쪼갠 뒤, 맨 마지막 요소("Main.html")만 쏙 뽑아옵니다.
    const fileName = item.path.split("/").pop();

    // 현재 보고 있는 페이지가 이 메뉴 버튼의 페이지가 맞는지(활성화 상태인지) 검사합니다.
    const isActive =
      currentPath.includes(fileName) || // 현재 주소에 아까 뽑은 파일명이 포함되어 있거나,
      (currentPath === "/" && item.name === "홈"); // 현재 주소가 그냥 "/" 이고 메뉴 이름이 "홈"일 때 활성화(true) 처리합니다.

    // 활성화 상태(isActive)가 true라면 "active"라는 글자를 넣고, 아니면 빈칸("")을 넣습니다.
    const activeClass = isActive ? "active" : "";

    // 활성화 상태면 아이콘을 꽉 찬 모양("ph-fill")으로 만들고, 아니면 기본 선 모양("ph")으로 만듭니다. (Phosphor 아이콘 라이브러리 사용 중)
    const iconStyle = isActive ? "ph-fill" : "ph";

    // 주의: class를 'bottom-nav-item'으로 변경하여 기존 코드와 충돌 방지!
    // 위에서 구한 값들을 바탕으로 개별 메뉴 버튼의 HTML 태그를 하나씩 조립해서 navHTML에 계속 이어 붙입니다(+=).
    navHTML += `
      <a href="${item.path}" class="bottom-nav-item ${activeClass}">
        <i class="${iconStyle} ${item.iconClass}"></i>
        <span>${item.name}</span>
      </a>
    `;
  });

  // 반복문이 다 돌아서 버튼 태그들이 싹 다 이어 붙여지면, 마지막으로 </nav>로 태그를 닫아 완성합니다.
  navHTML += "</nav>";

  // 4. 이렇게 완성된 전체 메뉴바 HTML 코드를, 현재 웹페이지 문서의 <body> 태그 안쪽 맨 끝(beforeend)에 삽입합니다.
  // 이렇게 하면 HTML 파일에 직접 적지 않아도 브라우저 화면에 메뉴바가 짠 하고 나타납니다!
  document.body.insertAdjacentHTML("beforeend", navHTML);
});
