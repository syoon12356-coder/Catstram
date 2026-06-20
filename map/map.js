// 1. 지도 띄우기
let map = L.map("map", { zoomControl: false }).setView(
  // HTML에서 id가 'map'인 요소를 찾아 지도를 생성합니다. 줌 컨트롤 버튼은 기본 위치(왼쪽 위)에서 뺍니다.
  [37.5665, 126.978], // 지도의 맨 처음 중심 좌표입니다. (현재는 서울 시청 근처 위도/경도)
  15, // 지도의 기본 확대/축소(줌) 수준입니다. 숫자가 클수록 더 가깝게 확대됩니다.
);
L.control.zoom({ position: "bottomright" }).addTo(map); // 화면 오른쪽 아래(bottomright)에 확대/축소 줌 버튼을 따로 배치합니다.
L.tileLayer(
  // 지도의 실제 배경 이미지(지도 타일)를 불러옵니다.
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", // 깔끔한 디자인으로 유명한 CartoDB의 배경 지도 주소입니다.
).addTo(map); // 불러온 배경 이미지를 우리가 만든 지도(map) 위에 덮어씌웁니다.

// 2. 심플한 주황색 동그라미 마커 디자인
const catIcon = L.divIcon({
  // Leaflet 라이브러리에서 제공하는 HTML 기반 커스텀 마커(divIcon)를 생성합니다.
  className: "", // Leaflet이 기본적으로 넣는 투명 배경 클래스를 초기화(비워둠)합니다.
  html: '<div class="custom-cat-marker">!</div>', // 지도 위에 실제로 그려질 HTML 모양입니다. CSS로 꾸민 동그라미 안에 느낌표(!)가 들어갑니다.
  iconSize: [36, 36], // 마커의 가로, 세로 크기를 각각 36픽셀로 고정합니다.
});

// 3. 고양이 상세 데이터 목록
const mockCats = [
  // 실제 서버와 연결하기 전, 테스트 화면을 띄우기 위해 만들어둔 가짜(mock) 고양이 데이터 리스트입니다.
  {
    lat: 37.5665, // 고양이가 발견된 위치의 위도
    lng: 126.978, // 고양이가 발견된 위치의 경도
    name: "냠이", // 화면에 띄울 고양이 이름
    features: "노란 턱시도 고양이", // 외형 특징 설명
    sightings: 15, // 동네에서 발견된 총 횟수
    lastSeen: "2시간 전", // 가장 최근에 발견된 시간
    snack: "닭가슴살 트릿", // 좋아하는 간식
    allergy: "연어 성분 사료", // 먹이면 안 되는 음식(알레르기)
    memo: "사람을 아주 좋아하고 애교가 많아요. 가까이 가면 골골송을 부르며 먼저 다가옵니다", // 성격이나 주의사항 등의 상세 메모
    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150", // 화면에 띄울 고양이 사진의 웹 주소
  },
  {
    // 두 번째 고양이 데이터 세트입니다.
    lat: 37.567,
    lng: 126.979,
    name: "고미",
    features: "올블랙, 꼬리 짧음",
    sightings: 7,
    lastSeen: "어제 저녁",
    snack: "참치 츄르",
    allergy: "특이사항 없음",
    memo: "경계심이 조금 있는 편이라 갑자기 다가가면 도망갑니다. 멀리서 간식을 던져주면 조심스럽게 다가와서 먹어요.",
    img: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=150",
  },
];

// 4. 지도에 고양이 마커 찍기 및 클릭 이벤트 설정
mockCats.forEach((cat) => {
  // mockCats 리스트 안에 있는 고양이 데이터를 하나씩 꺼내서 반복 작업(forEach)을 진행합니다.
  let marker = L.marker([cat.lat, cat.lng], { icon: catIcon }).addTo(map); // 각 고양이의 위도(lat)와 경도(lng) 위치에 아까 만든 커스텀 마커(catIcon)를 지도에 찍습니다.

  marker.on("click", () => {
    // 지도에 찍힌 마커를 사용자가 클릭했을 때 아래 코드가 실행되도록 설정(on)합니다.

    // HTML에 미리 만들어둔 빈 프로필 카드 영역의 텍스트를 클릭한 고양이의 데이터로 싹 교체합니다.
    document.getElementById("card-name").textContent = cat.name;
    document.getElementById("card-features").textContent = cat.features;
    document.getElementById("card-sightings").textContent =
      cat.sightings + "회"; // 발견 횟수 숫자 뒤에 '회'라는 글자를 붙여서 예쁘게 출력합니다.
    document.getElementById("card-time").textContent = cat.lastSeen;
    document.getElementById("card-snack").textContent = cat.snack;
    document.getElementById("card-allergy").textContent = cat.allergy;
    document.getElementById("card-memo").textContent = cat.memo;

    document.getElementById("card-photo").src = cat.img; // 글자뿐만 아니라 이미지 태그의 소스(src)도 변경하여 사진을 띄웁니다.

    document.getElementById("cat-profile-card").classList.add("active"); // 내용 교체가 끝난 프로필 카드 요소에 'active' 클래스를 붙여 화면에 스르륵 나타나게 만듭니다.
    map.flyTo([cat.lat, cat.lng - 0.003], 16, { duration: 0.5 }); // 마커를 클릭하면 화면 중심이 해당 고양이 위치로 스윽 이동(flyTo)합니다. (오른쪽에 뜨는 카드가 마커를 가리지 않게 경도를 왼쪽으로 살짝(-0.003) 옮겨주는 센스!)
  });
});

// 5. 카드 닫기 버튼 로직
document
  .getElementById("btn-close-card") // HTML에서 '닫기' 버튼(X 모양 등)을 찾습니다.
  .addEventListener("click", () => {
    // 닫기 버튼을 클릭했을 때 실행할 코드를 등록합니다.
    document
      .getElementById("cat-profile-card") // 고양이 상세 정보 카드 요소를 다시 찾아서
      .classList.remove("active"); // 'active' 클래스를 지워버려 화면에서 다시 숨깁니다.
  });

// 6. 내 위치 찾기 기능
document
  .getElementById("btn-my-location") // '내 위치로 가기' 과녁 모양 버튼을 찾습니다.
  .addEventListener("click", () => {
    // 버튼을 클릭했을 때 실행할 코드를 등록합니다.
    map.locate({ setView: true, maxZoom: 16 }); // 기기의 GPS 정보를 활용해 사용자의 현재 위치를 파악하고, 지도를 그 위치로 자동 이동(setView)시킵니다. 확대는 16까지만 허용합니다.
  });
