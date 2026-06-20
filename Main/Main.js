// 1. 개별 좋아요 토글 기능
function showAction(element) {
  const heartIcon = element.querySelector("i");
  const countSpan = element.querySelector(".like_count");
  let currentCount = parseInt(countSpan.innerText) || 0;

  if (
    element.style.color === "rgb(255, 77, 109)" ||
    element.style.color === "#ff4d6d"
  ) {
    // 좋아요 취소
    element.style.color = "white";
    heartIcon.className = "ph ph-heart";
    currentCount--;
  } else {
    // 좋아요 누름
    element.style.color = "#ff4d6d";
    heartIcon.className = "ph-fill ph-heart";
    currentCount++;
  }

  countSpan.innerText = currentCount;
}

// 2. 주소 복사 기능
function copyAddress() {
  const currentUrl = window.location.href;

  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      alert("주소가 복사되었습니다! 📋");
    })
    .catch((err) => {
      console.error("복사 실패:", err);
      alert("복사에 실패했습니다. 주소를 직접 복사해 주세요.");
    });
}
