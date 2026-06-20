document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  const navItems = [
    { name: "홈", path: "/Main/Main.html", iconClass: "ph-house" },
    {
      name: "업로드",
      path: "/Upload/Upload.html",
      iconClass: "ph-upload-simple",
    },
    { name: "map", path: "/map/map.html", iconClass: "ph-map-pin" },
    {
      name: "마이페이지",
      path: "/Mypage/Mypage.html",
      iconClass: "ph-user-circle",
    },
  ];

  let navHTML = '<nav class="bottom-nav">';

  navItems.forEach((item) => {
    // 경로 비교 (파일명 기준)
    const fileName = item.path.split("/").pop();
    const isActive =
      currentPath.includes(fileName) ||
      (currentPath === "/" && item.name === "홈");

    const activeClass = isActive ? "active" : "";
    const iconStyle = isActive ? "ph-fill" : "ph";

    // 🚀 주의: class를 'bottom-nav-item'으로 변경하여 기존 코드와 충돌 방지!
    navHTML += `
      <a href="${item.path}" class="bottom-nav-item ${activeClass}">
        <i class="${iconStyle} ${item.iconClass}"></i>
        <span>${item.name}</span>
      </a>
    `;
  });

  navHTML += "</nav>";

  document.body.insertAdjacentHTML("beforeend", navHTML);
});
