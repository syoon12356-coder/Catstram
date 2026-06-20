// 지도 띄우기
let map = L.map("map", { zoomControl: false }).setView(
        [37.5665, 126.978],
        15,
      );
      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      ).addTo(map);

      // 2. 심플한 주황색 동그라미 마커 디자인
      const catIcon = L.divIcon({
        className: "",
        html: '<div class="custom-cat-marker">!</div>',
        iconSize: [36, 36],
      });

      // 3. 고양이 상세 데이터 목록
      const mockCats = [
        {
          lat: 37.5665,
          lng: 126.978,
          name: "냠이",
          features: "노란 턱시도 고양이",
          sightings: 15,
          lastSeen: "2시간 전",
          snack: "닭가슴살 트릿",
          allergy: "연어 성분 사료",
          memo: "사람을 아주 좋아하고 애교가 많아요. 가까이 가면 골골송을 부르며 먼저 다가옵니다",
          img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150",
        },
        {
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
        let marker = L.marker([cat.lat, cat.lng], { icon: catIcon }).addTo(map);

        marker.on("click", () => {
          document.getElementById("card-name").textContent = cat.name;
          document.getElementById("card-features").textContent = cat.features;
          document.getElementById("card-sightings").textContent =
            cat.sightings + "회";
          document.getElementById("card-time").textContent = cat.lastSeen;
          document.getElementById("card-snack").textContent = cat.snack;
          document.getElementById("card-allergy").textContent = cat.allergy;
          document.getElementById("card-memo").textContent = cat.memo;
          document.getElementById("card-photo").src = cat.img;

          document.getElementById("cat-profile-card").classList.add("active");
          map.flyTo([cat.lat, cat.lng - 0.003], 16, { duration: 0.5 });
        });
      });

      // 5. 카드 닫기 버튼 로직
      document
        .getElementById("btn-close-card")
        .addEventListener("click", () => {
          document
            .getElementById("cat-profile-card")
            .classList.remove("active");
        });

      // 6. 내 위치 찾기
      document
        .getElementById("btn-my-location")
        .addEventListener("click", () => {
          map.locate({ setView: true, maxZoom: 16 });
        });