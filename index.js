document.addEventListener("DOMContentLoaded", function() {
// nav
document.querySelectorAll(".nav .link").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        if (e.target.id == "btn_all") {
            document.querySelectorAll(".sec").forEach((sec) => {
                sec.style.display = "flex";
            });
        } else {
            document.querySelectorAll(".sec").forEach((sec) => {
                sec.style.display = "none";
            });
            document.getElementById(e.target.id.replace("btn_", "")).style.display = "flex";
        }
    });
});

// dice
document.getElementById("dx_roll").addEventListener("click", function () {
    let $dice = document.querySelector("#dice") ?? "",
        dice = $dice.value ?? 1,
        $cri = document.querySelector("#cri") ?? "",
        cri = $cri.value ?? 10,
        $plus = document.querySelector("#plus") ?? "",
        plus = $plus.value ?? 0;

    if (!$dice || !dice) {
        dice = 1;
        $dice.value = dice;
    }
    if (!$cri || !cri) {
        cri = 10;
        $cri.value = cri;
    }
    if (!$plus || !plus) {
        plus = 0;
        $plus.value = plus;
    }

    document.querySelector(".dice-log").innerHTML = `<div>${dice} dx ${cri} + ${plus}</div>`;

    let result = rollingDxDice(dice, cri, plus);
    document.querySelector(".dice-log").innerHTML += `<div>${result.log} = ${
        result.sum
    }</div><div>${result.sum} + ${parseInt(plus)} = ${result.sum + parseInt(plus)}</div>`;
});

// overed
document.querySelectorAll(".btn-breed").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        let ttid = e.target.closest("button").id;

        let res = chooseBreed();
        document.getElementById(ttid + "_log").innerHTML = res;
    });
});

// lifepath
document.querySelectorAll(".btn-life-roll").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        let ttid = e.target.closest("button").id;

        let res = chooseLife(ttid);
        printLife(ttid, res);
    });
});

// oneclick
document.getElementById("one").addEventListener("click", function (e) {
    let res = "";
    let menu = [
        "origin",
        "experience_student",
        "experience_normal",
        "experience_back",
        "experience_ugn",
        "encounter",
        "awakening",
        "impulse",
        "emotion_plus",
        "emotion_minus",
    ];

    menu.forEach((el) => {
        res = chooseLife(el);
        printLife(el, res);
    });
});

// 함수
function chooseBreed() {
    let breedList = [
        "엔젤=헤일로",
        "발로르",
        "블랙독",
        "브람=스토커",
        "키마이라",
        "엑자일",
        "하누만",
        "모르페우스",
        "노이만",
        "오르쿠스",
        "샐러맨더",
        "솔라리스",
        "우로보로스",
        "아자토스",
    ];
    let dice = rollingDice(12);

    if (document.getElementById("inc_our").checked) {
        dice = rollingDice(14);
    }

    return breedList[dice - 1];
}

function chooseLife(cate) {
    let dice = rollingDice(100),
        dice10 = rollingDice(10),
        diceResult = Math.floor((dice - 1) / 5),
        list = "";

    switch (cate) {
        case "origin":
            let originList = [
                {
                    dice: "01~05",
                    title: "천애고아",
                    desc: "천애고아다.고아였다.무언가의 이유로 가족과 별거하게 되었다 등 이유는 자유롭게 설정해도 좋다.",
                    lois: "이해자",
                },
                {
                    dice: "06~10",
                    title: "부친(모친)",
                    desc: "부재, 부친 혹은 모친이 없다",
                    lois: "부친(모친)",
                },
                {
                    dice: "11~15",
                    title: "양부모",
                    desc: "양부모에게서 키워졌다.양부모나, 진짜 부모와의 관계 등은 자유롭게 설정해도 좋다.",
                    lois: "양부모",
                },
                {
                    dice: "16~20",
                    title: "조직의 일원",
                    desc: "부모가 어딘가의 조직원이다.어떤 조직인가, 조직의 관계 등은 자유롭게 설정해도 좋다.",
                    lois: "조직원",
                },
                {
                    dice: "21~25",
                    title: "정치권력",
                    desc: "부모가 정치적인 권력을 가지고 있다.정치가이기도 하며, 관리기도 하고, 구체적인 입장은 자유롭게 설정해도 좋다.",
                    lois: "부친(모친)",
                },
                {
                    dice: "26~30",
                    title: "권력자의 혈족",
                    desc: "혈족으로 이어지는 가계의 후예로써 태어나, 그 때부터 권력을 가지고 있다.",
                    lois: "교육자",
                },
                {
                    dice: "31~35",
                    title: "자산가",
                    desc: "부모가 자산가이며, 경제적으로 풍족하다",
                    lois: "부친(모친)",
                },
                {
                    dice: "36~40",
                    title: "유명인",
                    desc: "부모가 사회적 인지도가 높다.",
                    lois: "부친(모친)",
                },
                {
                    dice: "41~45",
                    title: "형제",
                    desc: "남자 윗사람 혹은 남자 아랫사람이 있다.형제와의 관계, 혈연관계의 유무, 연령차이 등은 자유롭게 설정해도 좋다.",
                    lois: "윗사람(아랫사람)",
                },
                {
                    dice: "46~50",
                    title: "자매",
                    desc: "여자 윗사람 혹은 여자 아랫사람이 있다.자매와의 관계, 혈연관계의 유무, 연령차이 등은 자유롭게 설정해도 좋다.",
                    lois: "윗사람(아랫사람)",
                },
                {
                    dice: "51~55",
                    title: "명가의 출신",
                    desc: "유래가 있는 가문에 태어났다",
                    lois: "부친(모친)",
                },
                {
                    dice: "56~60",
                    title: "부모의 이해",
                    desc: "부모가 레네게이드 바이러스에 대해 이해하고 있다.",
                    lois: "부친(모친)",
                },
                {
                    dice: "61~65",
                    title: "빈곤",
                    desc: "경제적으로 곤란한 가정에 태어났다.",
                    lois: "친구",
                },
                {
                    dice: "66~70",
                    title: "지긋지긋한 아이",
                    desc: "누가 어떤 이유로 꼴보기 싫어하는지는 자유롭게 설정해도 좋다.",
                    lois: "친척",
                },
                {
                    dice: "71~75",
                    title: "바라마지않던 아이",
                    desc: "무언가의 이유로, 축복받으며 태어났다.누가 어떤 이유로 바랬는지는 자유롭게 설정해도 좋다.",
                    lois: "가족",
                },
                {
                    dice: "76~80",
                    title: "안정된 가족",
                    desc: "안정된 가정에 태어나, 평탄한 인생을 살아왔다.",
                    lois: "부친(모친)",
                },
                {
                    dice: "81~85",
                    title: "친척과 소원",
                    desc: "친족과 사이가 멀다.소원해진 상대나 이유는 자유롭게 설정해도 좋다.",
                    lois: "친척",
                },
                {
                    dice: "86~90",
                    title: "여러명의 형제자매",
                    desc: "여러명의 형제자매가 있다.",
                    lois: "형제자매",
                },
                {
                    dice: "91~95",
                    title: "쌍둥이",
                    desc: "쌍둥이인 형제자매가 있다.",
                    lois: "쌍둥이",
                },
                {
                    dice: "96~100",
                    title: "범죄자의 아이",
                    desc: "가족이 범죄자다.어느정도의 범죄를 저질렀는가는 자유롭게 설정해도 좋다.",
                    lois: "부친(모친)",
                },
            ];
            return { dice: dice, list: originList[diceResult] };
            break;
        case "experience_student":
            let experienceStudentList = [
                {
                    dice: "01~05",
                    title: "평범",
                    desc: "내세울 것은 아무것도 없는, 평범한 인생을 살았다.",
                    lois: "반 친구",
                },
                {
                    dice: "06~10",
                    title: "영원한 이별",
                    desc: "소중한 누군가와의 영원한 이별을 겪었다.",
                    lois: "첫 친구",
                },
                {
                    dice: "11~15",
                    title: "장기입원",
                    desc: "큰 병이나 큰 상처를 입어 장기입원을 했다. 고독감을 얻는다거나, 병으로 앞으로 나설 용기가 없는 등 영향은 자유롭게 설정해도 좋다.",
                    lois: "의사",
                },
                {
                    dice: "16~20",
                    title: "큰 사고",
                    desc: "당신은 커다란 사고에 휘말리고 말았다. 그 사고에 대해서는 다들 알고있다.",
                    lois: "구조자",
                },
                {
                    dice: "21~25",
                    title: "죽음과 재생",
                    desc: "일시적인 빈사상태였으며, 부활했다. 사망선고를 받았으면서도 소생했다거나, 호적에서 파였다던가 자유롭게 설정해도 좋다.",
                    lois: "의사",
                },
                {
                    dice: "26~30",
                    title: "소실",
                    desc: "소중했던 인형, 친구, 살고 있던 집 등, 소중한 것을 잃었다.",
                    lois: "오랜 친구",
                },
                {
                    dice: "31~35",
                    title: "살상",
                    desc: "당신에게 악의는 없었지만, 누군가를 죽이고 말았다. 그의 가족이나 친구는 지금도 살아가고 있다.",
                    lois: "고인",
                },
                {
                    dice: "36~40",
                    title: "뉴스",
                    desc: "당신은 TV나 신문 등에 나온 적이 있다.",
                    lois: "저널리스트",
                },
                {
                    dice: "41~45",
                    title: "해외생활",
                    desc: "태어난 나라를 떠나, 해외에서 일정기간 생활했다.",
                    lois: "해외의 친구",
                },
                {
                    dice: "46~50",
                    title: "대성공",
                    desc: "시험은 높은 점수고, 대회에선 우수한 성적을 따내는 등, 커다란 성공을 이루어 내어 명성을 얻었다.",
                    lois: "라이벌",
                },
                {
                    dice: "51~55",
                    title: "트라우마",
                    desc: "떠올리고 싶지 않을 정도로, 정신적으로 커다란 병을 얻었다.",
                    lois: "모친",
                },
                {
                    dice: "56~60",
                    title: "도주",
                    desc: "수험, 비애, 덮쳐오는 졈 등, 무언가로부터 도망쳤다. 도망친 결과로 나타난 영향은 자유롭게 설정해도 좋다.",
                    lois: "졈",
                },
                {
                    dice: "61~65",
                    title: "첫사랑",
                    desc: "그 사람을 사랑했다. 지금은 아련한 추억이다.",
                    lois: "첫사랑",
                },
                {
                    dice: "66~70",
                    title: "전학",
                    desc: "무언가의 이유로 학교를 옮겼다.",
                    lois: "반 친구",
                },
                {
                    dice: "71~75",
                    title: "커다란 전환",
                    desc: "부모의 이혼, 추억의 장소에 빌딩이 세워지는 등, 환경의 변화가 당신에게 커다란 전환기가 되었다.",
                    lois: "소꿉친구",
                },
                {
                    dice: "76~80",
                    title: "작은 명예",
                    desc: "시험에서 학년 5등이 되었다, 어딘가의 콩쿨에서 입상했다 등 약간은 자랑할 만한 경험을 했다.",
                    lois: "라이벌",
                },
                {
                    dice: "81~85",
                    title: "대실패",
                    desc: "시험에서 불합격했다, 자신의 실수로 시합에서 졌다 등 마음에 후회가 남을만한 실패를 경험했다.",
                    lois: "친구",
                },
                {
                    dice: "86~90",
                    title: "친구",
                    desc: "당신은 누구와도 바꿀 수 없는 친구를 얻었다.",
                    lois: "친구",
                },
                {
                    dice: "91~95",
                    title: "약속",
                    desc: "영원히 지켜주겠다는 약속을 했다. 어떤 약속인지는 자유롭게 정해도 좋다.",
                    lois: "약속한 상대",
                },
                {
                    dice: "96~100",
                    title: "기억상실",
                    desc: "어느 기간의 기억이 사라졌다. 원인은 자유롭게 정해도 좋다.",
                    lois: "기억 속의 누군가",
                },
            ];
            return { dice: dice, list: experienceStudentList[diceResult] };
            break;
        case "experience_normal":
            let experienceNormalList = [
                {
                    dice: "01~05",
                    title: "평범",
                    desc: "내세울 것은 아무것도 없는, 평범한 인생을 살았다.",
                    lois: "동료",
                },
                {
                    dice: "06~10",
                    title: "영원한 이별",
                    desc: "소중한 누군가와의 영원한 이별을 겪었다.",
                    lois: "부친",
                },
                {
                    dice: "11~15",
                    title: "장기입원",
                    desc: "큰 병이나 큰 상처를 입어 장기입원을 했다. 고독감을 얻는다거나, 병으로 앞으로 나설 용기가 없는 등 영향은 자유롭게 설정해도 좋다.",
                    lois: "친구",
                },
                {
                    dice: "16~20",
                    title: "결혼",
                    desc: "결혼했다. 배우자와의 관계, 사회적, 물리적, 정신적인 영향 등은 자유롭게 설정해도 좋다.",
                    lois: "배우자",
                },
                {
                    dice: "21~25",
                    title: "죽음과 재생",
                    desc: "일시적인 빈사상태였으며, 부활했다. 사망선고를 받았으면서도 소생했다거나, 호적에서 파였다던가 자유롭게 설정해도 좋다.",
                    lois: "의사",
                },
                {
                    dice: "26~30",
                    title: "소실",
                    desc: "소중했던 인형, 친구, 살고 있던 집 등, 소중한 것을 잃었다.",
                    lois: "오랜 친구",
                },
                {
                    dice: "31~35",
                    title: "피해자",
                    desc: "어느 범죄에 휘말린 적이 있다.",
                    lois: "범인",
                },
                {
                    dice: "36~40",
                    title: "뉴스",
                    desc: "당신은 TC나 신문 등에 나온 적이 있다.",
                    lois: "저널리스트",
                },
                {
                    dice: "41~45",
                    title: "해외생활",
                    desc: "태어난 나라를 떠나, 해외에서 일정기간 생활했다.",
                    lois: "해외의 친구",
                },
                {
                    dice: "46~50",
                    title: "대성공",
                    desc: "커다란 거래를 성공했다, 명성을 얻을 이유로 유명해졌다 등 커다란 성공을 이루어 내어 명성을 얻었다.",
                    lois: "동료",
                },
                {
                    dice: "51~55",
                    title: "아이",
                    desc: "아이를 얻었다. 상대와의 관계, 부모가 된 기분 등 상세한 것은 자유롭게 정해도 좋다.",
                    lois: "아이",
                },
                {
                    dice: "56~60",
                    title: "출세",
                    desc: "영향력이 높은 지위에 올랐다. 어떤 수단이었는가, 생활이나 감정의 변화 등은 자유롭게 정해도 좋다.",
                    lois: "상사",
                },
                {
                    dice: "61~65",
                    title: "실연",
                    desc: "실연했다. 대상, 영향 등은 자유롭게 정해도 좋다.",
                    lois: "사랑했던 상대",
                },
                {
                    dice: "66~70",
                    title: "매우 바쁨",
                    desc: "오로지 일에 매달렸고, 바쁜 일상을 보냈다. 저금이 얼마가 모였는가, 몸이 얼마나 망가졌는가는 자유롭게 정해도 좋다.",
                    lois: "고객",
                },
                {
                    dice: "71~75",
                    title: "공백기간",
                    desc: "움직이지도 못하고, 무언가를 배우지도 않으며 보냈다. 어리석었는가, 그만큼 즐거웠는가. 영향은 자유롭게 정해도 좋다.",
                    lois: "모친",
                },
                {
                    dice: "76~80",
                    title: "대전락",
                    desc: "주식에 손을 대 실패했다, 다니던 회사가 갑자기 도산해버렸다 등 밑바닥으로 추락했다.",
                    lois: "친구",
                },
                {
                    dice: "81~85",
                    title: "굴욕",
                    desc: "일 관계에서 업신여겨졌다, 지배자나 친족에게서 배신감을 느끼는 등, 무언가 굴욕적인 꼴을 당했다.",
                    lois: "라이벌",
                },
                {
                    dice: "86~90",
                    title: "맹우",
                    desc: "생사를 함께 할 동료를 얻었다.",
                    lois: "친구",
                },
                {
                    dice: "91~95",
                    title: "금단의 사랑",
                    desc: "사랑해서는 안될 사람을 사랑해버리고 말았다. 어떤 사람인가, 그 관계와 끝 등 자유롭게 정해도 좋다.",
                    lois: "애인",
                },
                {
                    dice: "96~100",
                    title: "기억상실",
                    desc: "어느 기간의 기억이 사라졌다. 원인은 자유롭게 정해도 좋다.",
                    lois: "기억 속의 누군가",
                },
            ];
            return { dice: dice, list: experienceNormalList[diceResult] };
            break;
        case "experience_back":
            let experienceBackList = [
                {
                    dice: "01~05",
                    title: "무위",
                    desc: "참으로 무위한 생활을 보냈다. 그걸 어떻게 생각하는가, 어떤 영향을 받았는지는 자유롭게 정해도 좋다.",
                    lois: "이웃",
                },
                {
                    dice: "06~10",
                    title: "영원한 이별",
                    desc: "소중한 누군가와의 영원한 이별을 겪었다.",
                    lois: "친구",
                },
                {
                    dice: "11~15",
                    title: "장기입원",
                    desc: "큰 병이나 큰 상처를 입어 장기입원을 했다. 고독감을 얻는다거나, 병으로 앞으로 나설 용기가 없는 등 영향은 자유롭게 설정해도 좋다.",
                    lois: "간호사",
                },
                {
                    dice: "16~20",
                    title: "큰 사고",
                    desc: "당신은 고의인지 우연인지, 커다란 사고를 일으키고 말았다. 그 사고에 대해서는 다들 알고있다.",
                    lois: "피해자",
                },
                {
                    dice: "21~25",
                    title: "죽음과 재생",
                    desc: "일시적인 빈사상태였으며, 부활했다.",
                    lois: "의사",
                },
                {
                    dice: "26~30",
                    title: "소실",
                    desc: "애마, 절친한 친구, 살고 있던 집 등 소중한 것을 잃었다.",
                    lois: "동료",
                },
                {
                    dice: "31~35",
                    title: "범죄",
                    desc: "범죄를 일으켰다. 어떤 범죄인가, 어느 정도의 주체성이었는가, 전과는 있는가, 죄악감의 유무 등은 자유롭게 정해도 좋다.",
                    lois: "피해자",
                },
                {
                    dice: "36~40",
                    title: "사회면 기사",
                    desc: "당신은 TV나 신문 등에 나온 적이 있다.",
                    lois: "저널리스트",
                },
                {
                    dice: "41~45",
                    title: "배신",
                    desc: "커다란 화근을 남길 배신행위를 했다.",
                    lois: "동료",
                },
                {
                    dice: "46~50",
                    title: "대박",
                    desc: "도박에서 크게 이겼다, 야한 거래로 커다란 돈을 벌었다 등 갑작스러운 성공을 경험했다.",
                    lois: "부하",
                },
                {
                    dice: "51~55",
                    title: "전설",
                    desc: "폭주족을 혼자서 전멸시켰다, 구련보등(마작)을 만들었다 등 전설을 만들었다. 진위, 영향 등은 자유롭게 설정해도 좋다.",
                    lois: "전설의 증인",
                },
                {
                    dice: "56~60",
                    title: "무한회랑",
                    desc: "술, 도박 등 치명적인 것에 의존하는 생활을 살고 있다.",
                    lois: "상인",
                },
                {
                    dice: "61~65",
                    title: "세기의 연애",
                    desc: "그 사람을 위해서라면 무엇을 적으로 돌리더라도 좋다고 생각할 정도로 사랑에 빠져, 자연스럽게 옭여매어져있다.",
                    lois: "사랑하는 상대",
                },
                {
                    dice: "66~70",
                    title: "위험한 일",
                    desc: "몸이나 지금의 입장이 위험할 정도로, 위법한 일을 하고 있다.",
                    lois: "고객",
                },
                {
                    dice: "71~75",
                    title: "싸움의 날들",
                    desc: "싸움 상대, 스포츠의 강호교, 학교, 사회 등, 언제나 무언가와 싸우고 있다.",
                    lois: "적",
                },
                {
                    dice: "76~80",
                    title: "지워지지 않는 상처",
                    desc: "사람을 상처입혔다. 육체적인 것인가 정신적인 것인가, 어느정도의 상처인가는 자유롭게 설정해도 좋다.",
                    lois: "상처입힌 상대",
                },
                {
                    dice: "81~85",
                    title: "패배",
                    desc: "누군가에게 체면이 구겨졌다, 자신의 실수로 동료가 당했다 등, 마음에 후회가 남을 만한 패배를 경험했다.",
                    lois: "라이벌",
                },
                {
                    dice: "86~90",
                    title: "절연",
                    desc: "본래라면 무척이나 친했을 인물과 절연하고, 다시는 만나지 못하게 되었다. 누구와 어떤 이유로 헤어졌는지는 자유롭게 정해도 좋다.",
                    lois: "절연한 상대",
                },
                {
                    dice: "91~95",
                    title: "한 마리 늑대",
                    desc: "누군가와 엮이지도 않고, 누군가와 터놓고 지내지도 않으며 고독한 인생을 살았다.",
                    lois: "원수",
                },
                {
                    dice: "96~100",
                    title: "기억상실",
                    desc: "어느 기간의 기억이 사라졌다. 원인은 자유롭게 정해도 좋다.",
                    lois: "기억 속의 누군가",
                },
            ];
            return { dice: dice, list: experienceBackList[diceResult] };
            break;
        case "experience_ugn":
            let experienceUgnList = [
                {
                    dice: "01~05",
                    title: "UGN에 충성",
                    desc: "UGN이라는 조직에 소속되어있는 것을 명예롭게 여기며, 충성을 바치고 있다.",
                    lois: "상사",
                },
                {
                    dice: "06~10",
                    title: "힘의 폭주",
                    desc: "이전에 바이러스의 힘이 폭주하여, 주변에 커다란 피해를 입힌 적이 있다.",
                    lois: "UGN의 에이전트",
                },
                {
                    dice: "11~15",
                    title: "실험체",
                    desc: "실험동물과도 같이 취급된 적이 있다. 그 탓에 인간불신이나 자신감상실이 생겼을 수도 있다.",
                    lois: "연구원",
                },
                {
                    dice: "16~20",
                    title: "마음의 벽",
                    desc: "자신의 특별한 생활 탓에, 다른사람과의 정신적인 벽을 느끼고 있다. 이유나 정도 등은 자유롭게 정해도 좋다.",
                    lois: "교관",
                },
                {
                    dice: "21~25",
                    title: "동료의 죽음",
                    desc: "예전에 같은 처지의 동료나 부하가 죽어 마음에 상처를 입었다.",
                    lois: "동료",
                },
                {
                    dice: "26~30",
                    title: "비밀",
                    desc: "당신 자신도 모르는 비밀을 가지고 있다. 상세한 것은 자세히 정해도, 딱히 정하지 않아도 된다.",
                    lois: "상사",
                },
                {
                    dice: "31~35",
                    title: "배신했다",
                    desc: "예전에 소중한 사람을 배신한 적이 있으며, 마음의 상처가 되었다.",
                    lois: "배신한 상대",
                },
                {
                    dice: "36~40",
                    title: "배신당했다",
                    desc: "예전에 소중한 사람에게 배신당한 적이 있으며, 마음의 상처를 입었다.",
                    lois: "원수",
                },
                {
                    dice: "41~45",
                    title: "평범함의 동경",
                    desc: "평범한 생활을 하는 인간을 동경한다.",
                    lois: "동료",
                },
                {
                    dice: "46~50",
                    title: "평범함의 반발",
                    desc: "평범한 생활을 하는 인간에게 반발한다.",
                    lois: "친구",
                },
                {
                    dice: "51~55",
                    title: "기억상실",
                    desc: "어느 기간의 기억이 사라졌다. 원인은 자유롭게 정해도 좋다.",
                    lois: "기억 속의 누군가",
                },
                {
                    dice: "56~60",
                    title: "도주",
                    desc: "UGN에서 도망치려고 한 적이 있었다. 하지만 그건 실패로 끝났다. 도주의 계기 등은 자유롭게 정해도 좋다.",
                    lois: "라이벌",
                },
                {
                    dice: "61~65",
                    title: "역전의 무사",
                    desc: "자신의 경험을 살려서, 일리걸이나 칠드런들에게 모범을 보인 적이 있다.",
                    lois: "신입",
                },
                {
                    dice: "66~70",
                    title: "기술반",
                    desc: "이전 뒷 편에서 서포트 스태프로써 UGN에 소속되었었다.",
                    lois: "동료",
                },
                {
                    dice: "71~75",
                    title: "적성조직",
                    desc: "사실은 FH에 소속되어있었다. 어째서 옮겨온 것인가, 그것에 따르는 영향은 자유롭게 정해도 좋다.",
                    lois: "FH 에이전트",
                },
                {
                    dice: "76~80",
                    title: "무균배양",
                    desc: "UGN의 연구시설에서 태어나, 바깥 세상을 모른채 자랐다.",
                    lois: "길러준 부모",
                },
                {
                    dice: "81~85",
                    title: "대승리",
                    desc: "UGN 소속의 오버드로써, 빛날만한 전공을 세운 적이 있다.",
                    lois: "후배",
                },
                {
                    dice: "86~90",
                    title: "더러운 일",
                    desc: "UGN 소속의 오버드로써의 일로, 두 번 다시 떠올리고 싶지 않는 전장을 경험했다.",
                    lois: "전우",
                },
                {
                    dice: "91~95",
                    title: "대실패",
                    desc: "UGN 소속의 오버드로써의 일로, 되돌릴 수 없는 실패를 겪었다.",
                    lois: "젬",
                },
                {
                    dice: "96~100",
                    title: "UGN을 향한 공포",
                    desc: "UGN이라고 하는 조직에 대해, 어딘가 공포를 가지고 있다.",
                    lois: "UGN 간부",
                },
            ];
            return { dice: dice, list: experienceUgnList[diceResult] };
            break;
        case "encounter":
            let encounterList = [
                {
                    dice: "01~05",
                    title: "자신",
                    desc: "그에게는, 어느새 자신을 겹쳐보고 있다.",
                    lois: "시키시마 아야메",
                },
                {
                    dice: "06~10",
                    title: "스승",
                    desc: "당신은 그에게서 이것저것을 배웠다.",
                    lois: "타마노 츠바키",
                },
                {
                    dice: "11~15",
                    title: "보호자",
                    desc: "그를 진짜 형이나 누나, 혹은 부모처럼 느끼고 있다.",
                    lois: "키리타니 유우고",
                },
                {
                    dice: "16~20",
                    title: "은인",
                    desc: "당신은 그에게서 은혜를 입은 적이 있다.",
                    lois: "텔레즈 블룸",
                },
                {
                    dice: "21~25",
                    title: "주인",
                    desc: "당신은 그를 섬기고 있다. 그가 충성을 받을만한 인간인가 아닌가는 어찌되었든.",
                    lois: "키리타니 유우고",
                },
                {
                    dice: "26~30",
                    title: "빚",
                    desc: "그에게는 '빚'이 있다. 당신에겐 그건 아직 남아있다.",
                    lois: "요한 C 코드웰",
                },
                {
                    dice: "31~35",
                    title: "좋은 사람",
                    desc: "태도와 언동으로 보건대, 그는 신용할 수 있다.",
                    lois: "타니 슈세이",
                },
                {
                    dice: "36~40",
                    title: "가족",
                    desc: "가족이라 부를 수 있을 정도로 그와 지내고 있다. 물론, 혈연관계여도 좋다.",
                    lois: "카미시로 사츠키",
                },
                {
                    dice: "41~45",
                    title: "친구",
                    desc: "그와는 마음이 잘 맞는 것 같다.",
                    lois: "시키시마 아야메",
                },
                {
                    dice: "46~50",
                    title: "동지",
                    desc: "당신과 그는, 어느 목적의 달성을 함께 하는 동료다.",
                    lois: "텔레즈 블룸",
                },
                {
                    dice: "51~55",
                    title: "비즈니스",
                    desc: "그와 당신은 비즈니스 파트너다.",
                    lois: "카미시로 사츠키",
                },
                {
                    dice: "56~60",
                    title: "동행자",
                    desc: "그와는 몇 번인가, 행동을 같이 한 적이 있다.",
                    lois: "타마노 츠바키",
                },
                {
                    dice: "61~65",
                    title: "망각",
                    desc: "확실히 그와 만난 적이 있다. 하지만 그건 대체 언제였던걸까...",
                    lois: "알프레드 J 코드웰",
                },
                {
                    dice: "66~70",
                    title: "그리움",
                    desc: "당신은 그를 연모하고 있다. 그건 남몰래 숨긴 슬픈 마음이다.",
                    lois: "히메미야 유리카",
                },
                {
                    dice: "71~75",
                    title: "빌려줌",
                    desc: "그에게는 '빌려준' 적이 있다. 당신에겐 그건 아직 남아있다.",
                    lois: "네코카와 미아",
                },
                {
                    dice: "76~80",
                    title: "어린아이",
                    desc: "그를 보고있으면, 보호심이 솟는다.",
                    lois: "텔레즈 블룸",
                },
                {
                    dice: "81~85",
                    title: "악연",
                    desc: "그는 옛날부터 알고있다. 그리고 지금도, 몇 번인가 관계됐다.",
                    lois: "카스가 쿄우지",
                },
                {
                    dice: "86~90",
                    title: "비밀",
                    desc: "두 사람은 비밀을 공유하고 있다. 아직 누구에게도 그걸 이야기하지 않았다.",
                    lois: "로자 바스커빌",
                },
                {
                    dice: "91~95",
                    title: "호적수",
                    desc: "그와는 힘을 겨루고 싶다. 그 마음이 호의보다도 크다.",
                    lois: "쿠로사키 타케미치",
                },
                {
                    dice: "96~100",
                    title: "살의",
                    desc: "그를 보고 있으면 검은 감정이 마음을 물들인다.",
                    lois: "이바 소우이치",
                },
            ];
            return { dice: dice, list: encounterList[diceResult] };
            break;
        case "awakening":
            if (document.getElementById("inc_aw").checked) {
                dice10 = rollingDice(12) - 1;
            }
            let awakeningList = [
                {
                    dice: "0",
                    title: "죽음",
                    desc: "당신은 죽었다. 그건 사고일 수도 있고, 누군가의 계획이었을지도 모른다. 하지만, 당신은 문득 눈치챘다. 몸 안에서 '힘'이 꿈틀거리는 것을.",
                    ren: 18,
                },
                {
                    dice: "1",
                    title: "분노",
                    desc: "그걸 본 순간, 당신은 몸이 떨렸다. 호흡이 크게 흐트러졌다. 피가 맥박쳤다. ...몸을 불태울 정도의 분노. 그것이 힘을 불러일으킬 방아쇠가 되었다.",
                    ren: 17,
                },
                {
                    dice: "2",
                    title: "소체",
                    desc: "당신은 선택받았다. 수많은 피험자 중에서 당신만이 선택받아, 힘을 얻었다. 당신의 존재는, 수많은 실패 위에 세워졌다. 연구의 성과야말로 당신이었다ㅡ.",
                    ren: 16,
                },
                {
                    dice: "3",
                    title: "감염",
                    desc: "당신의 힘은, '그 자'가 이끌어냈다. 그 자의 눈을 봤을 때, 느꼈다. 그가 당신을 어떻게 하고 싶었던 걸까. 어찌할 수 없는 사정? 자신의 목적을 위해서? 그건...",
                    ren: 14,
                },
                {
                    dice: "4",
                    title: "갈망",
                    desc: "채워지지 않는 욕망이 당신을 이끌었다. 몇 개의 희생도 마다하지 않으며 갈망했다. 바라는 것은 단 하나. 그것은 당신에게만 향하던 웃음이었을까, 누군가에게 이길 힘일까... 강한 마음에 반응하듯이 몸 안에서 무언가가 튀었다.",
                    ren: 17,
                },
                {
                    dice: "5",
                    title: "무지",
                    desc: "철이 들었을 때부터 '힘'은 당신과 함께 있었다. 원인은 아직 알 수 없다. 그저, 당신의 목적을 달성하기 위해서라는 사실만이 막연하게 있었다.",
                    ren: 15,
                },
                {
                    dice: "6",
                    title: "희생",
                    desc: "눈 앞에서, 당신이 기대고 있는 것이 해를 입고, 농락당했다. 그건, 저항하지도 못하고 그저 유린당할 뿐이었다. 당신은 바랬다. '지킬 힘이 필요해' 라고. 그 때, 몸 안에서 무언가가 꿈틀거렸다. 이 힘과 충동이야말로ㅡ",
                    ren: 16,
                },
                {
                    dice: "7",
                    title: "사명",
                    desc: "그... 혹은 그녀는, 당신에게 말했다. 새로운 생명체로 '진화'할 것을. 그건 당신이 받아들인 것인가, 강제적으로 그렇게 되버린 것일까. 어찌되었든, 당신은 받아들였다. 이제 평범한 생활로는 돌아갈 수 없다.",
                    ren: 15,
                },
                {
                    dice: "8",
                    title: "망각",
                    desc: "무언가 커다란 이유, 원인이 있었을 터였다. 당신에게 있어선 충격적인 일인 '무언가'가. 하지만 떠올리려고 하면 마음 속에서 안개로 가려져간다. 대신에 떠오르는 것은 똑같은 얼굴. 그건ㅡ",
                    ren: 17,
                },
                {
                    dice: "9",
                    title: "탐구",
                    desc: "자신은 대체 어디까지 갈 수 있을까. 그걸 확실히 하고 싶어서 이 힘을 얻었다. 힘을 각성시키기 위해서 어딘가의 조직의 힘을 빌렸을지도 모르고, 혼자서 그 방법을 탐구하고 연구했을지도 모른다.",
                    ren: 14,
                },
                {
                    dice: "10",
                    title: "속죄",
                    desc: "당신은 상처입혔다. 그건 정말 작은 실수였다. 하지만 그의 몸에, 마음에 커다란 상처를 남기고 말았다. 그건 평생 사라지지 않을 것이었다. 당신은 갚아야만 했다. 그 마음이 '힘'을 불러일으켰다.",
                    ren: 18,
                },
                {
                    dice: "11",
                    title: "탄생",
                    desc: "그건 당연한 '힘'이었다. 누구나 가지고 있을 것이라고 믿고있는 것. 당신은 태어났을 때부터 '오버드' 였다. 힘을 보여주면, 당신에게 향하는 사람들의 웃는 얼굴은 기이한 시선으로 바뀌었다.",
                    ren: 17,
                },
            ];
            return { dice: dice10, list: awakeningList[dice10] };
            break;
        case "impulse":
            if (document.getElementById("inc_aw").checked) {
                dice10 = rollingDice(12) - 1;
            }
            let impulseList = [
                {
                    dice: "0",
                    title: "해방",
                    desc: "상쾌한 기분이다. '인간'이라고 하는 시시한 이름의 옷을 벗어던지고, 자신은 좀더 고위의 생명체로써 진화를 하고 있었다. 원한, 사람으로써의 욕망, 감정. 이제 그딴 시시한 것들에 속박될 일은, 없다. ....대단해.",
                    ren: 18,
                },
                {
                    dice: "1",
                    title: "흡혈",
                    desc: "문득 느꼈다. 격렬한 갈증을. 동시에, 그것이 물 같은 것으로 채워지지 않는 갈증이라는 걸 본능적으로 알았다. 이걸 해결하려면, 당신이 바라는 것은, 눈 앞의... 혹은 마음에 떠오르는 사람의 신체에 흐르는 뜨거운 체액 뿐이다.",
                    ren: 17,
                },
                {
                    dice: "2",
                    title: "기근",
                    desc: "마음에 구멍이 뚫렸다. 무엇을 먹어도 채워지지 않는 구멍이. 무엇을 해도, 그 구멍이 메워질 일은 없을 거였다. 그래, 무엇을 해도...",
                    ren: 14,
                },
                {
                    dice: "3",
                    title: "살육",
                    desc: "미워서 죽이고 싶은 게 아니었다. 공포에 떨고, 삶에 집착하는 생명이 사라져가는 것이 보고싶다. 단말마의 비명이 듣고싶다. 오싹하고, 이제부터 일어날거야, 온 몸이 떨렸다... 천천히 당신은 그 장난감을 들었다.",
                    ren: 18,
                },
                {
                    dice: "4",
                    title: "파괴",
                    desc: "마음에서부터 끓어오르는 파괴충동. 모든 것을 없애버리면 돼. 시야에 비치는 모든것이 방해돼. 주먹과 다리에 걸린 무언가가 찌그러졌다. 그건, 무척 기분이 좋았다.",
                    ren: 16,
                },
                {
                    dice: "5",
                    title: "가학",
                    desc: "약한 자를 괴롭히는 쾌감이 있었다. 보고 싶은건 하나였다. 용서를 구하고, 울부짖는 모습. 자아, 공포에 떨렴. 약한 자일수록, 연약할수록, 괴롭힐 때의 쾌감이 크니까.",
                    ren: 15,
                },
                {
                    dice: "6",
                    title: "혐오",
                    desc: "뜻밖에 목구멍에서 뜨거운 것이 울컥였다. '그것'을 직시할 수가 없었다. 한 시라도 빨리... 한 발이라도 멀리 그것과 거리를 두고 싶었다. 몸 안의 무언가가 혐오를 표하고 있었다.",
                    ren: 15,
                },
                {
                    dice: "7",
                    title: "투쟁",
                    desc: "지금, 눈 앞에 있는 자와 싸우고 싶다. 그건 살아가는 모든 자가 가진 본능이었다. 죽이는 것에 아픔을 느끼는 건 위선이다. 싸운 자신이 죽지 않았다면 그걸로 된다. 웃는 얼굴인 채, 대지를 박차자. 죽여버리면, 그건 그냥 결과에 불과하다.",
                    ren: 16,
                },
                {
                    dice: "8",
                    title: "망상",
                    desc: "다시 생각해봐. 그가 자신에게 다가온 건, 정말 그러고 싶어서였을까? 무언가 의도가 있는게 아닐까? 믿을 수 없어. 주변의 모든 것이. 그래, 지금, 나에게 미소짓는 너같은 건...",
                    ren: 14,
                },
                {
                    dice: "9",
                    title: "자해",
                    desc: "자신은 여기에 있으면 안 될 인간이다. 그저 존재하는 것만이, 주변이 재앙에 휘말리고 만다. 자신에게, 이 이상 평범한 생활을 지내게 할 수는 없었다. 그러면 차라리...!",
                    ren: 16,
                },
                {
                    dice: "10",
                    title: "공포",
                    desc: "\"두근\" .... 심장이 고동쳤다. 본능이... 아니, 몸 안에 있는 무언가가, 마음에 경고를 울리고 있었다. 안돼, '그것'에 접촉해서는 안돼. '그 자'에게 가까이 가면 안돼. 몸이 움츠러들고, 마음이 새하얘져간다...",
                    ren: 17,
                },
                {
                    dice: "11",
                    title: "증오",
                    desc: "미워... 눈 앞에 있는 것, 모든 것이 미워. 몸 안에서 느껴지는 이 충동은 뭐지? 엄청난 분노에 피가 끓었다. 흘러넘치는 것은 순수한 증오. 왜, 나만이 이런 꼴이 돼? 흔들, 마음에 어두운 감정의 불꽃이 요동쳤다.",
                    ren: 18,
                },
            ];
            return { dice: dice10, list: impulseList[dice10] };
            break;
        case "emotion_plus":
            if (document.getElementById("inc_emo").checked) {
                diceResult = rollingDice(22) - 1;
            } else {
                diceResult = rollingDice(20);
            }

            let emotionPlusList = [
                {
                    dice: "0",
                    title: "경도",
                    desc: "당신은 상대의 사상이나 센스를 경도하게 된다.",
                    lois: "P",
                },

                {
                    dice: "01~05",
                    title: "호기심",
                    desc: "당신은 호기심을 자극당해, 상대에 대해 알고싶어진다.",
                    lois: "P",
                },
                {
                    dice: "06~10",
                    title: "동경",
                    desc: "당신은 상대에게 동경을 느낀다. 이제는 손에 넣을 수 없는 평범한 생활, 상대의 강함 같은 것을.",
                    lois: "P",
                },
                {
                    dice: "11~15",
                    title: "존경",
                    desc: "당신은 상대를 존경한다. 전투능력의 평가, 평범한 인간의 평범한 강함같은 것의 감동이라던가.",
                    lois: "P",
                },
                {
                    dice: "16~20",
                    title: "연대감",
                    desc: "당신은 상대에게 동료의식을 느낀다. 같은 오버드기에, 같은 UGN 칠드런이기에.",
                    lois: "P",
                },
                {
                    dice: "21~25",
                    title: "자애",
                    desc: "당신은 상대에게 친숙함을 느낀다. 병약한 여동생, 있는 힘껏 부활동에 힘쓰는 후배라던가.",
                    lois: "P",
                },

                {
                    dice: "26~30",
                    title: "감복",
                    desc: "당신은 상대에게 감복한다. 탁월한 전투능력, 버려진 강아지를 주워오는 상냥함이라던가.",
                    lois: "P",
                },
                {
                    dice: "31~35",
                    title: "순애",
                    desc: "당신은 상대에게 순수한 사랑을 느낀다. 보호대상으로써, 연애대상으로써, 라이벌로써.",
                    lois: "P",
                },
                {
                    dice: "36~40",
                    title: "우정",
                    desc: "당신은 상대에게 우정을 느낀다. 대상의 성별, 연령, 입장 등.",
                    lois: "P",
                },
                {
                    dice: "41~45",
                    title: "모정",
                    desc: "당신은 상대에게 마음 깊은 곳에서 찡하는 그리움을 느낀다. 죽은 육친의 추억같은 것을.",
                    lois: "P",
                },
                {
                    dice: "46~50",
                    title: "동정",
                    desc: "당신은 상대에게 동정감을 느낀다. 힘이 약한 오버드에게, 레네게이드 바이러스에 떠는 인간에게.",
                    lois: "P",
                },

                {
                    dice: "51~55",
                    title: "의지",
                    desc: "당신은 죽은 자가 남긴 마음을 떠올렸다. 어린 아이를 보고 이제는 없는 양친의 의지같은 것을.",
                    lois: "P",
                },
                {
                    dice: "56~60",
                    title: "비호",
                    desc: "당신은 상대를 지키고 싶다고 생각한다. 연약한 여동생을 지키고싶다, 괴롭힘받는 자를 구하고 싶다던가.",
                    lois: "P",
                },
                {
                    dice: "61~65",
                    title: "행복감",
                    desc: "당신은 상대를 보며 어딘가 기분좋음을 느낀다. 같이 있으면 마음이 편안해지고, 부드러운 기분이 된다.",
                    lois: "P",
                },
                {
                    dice: "66~70",
                    title: "신뢰",
                    desc: "당신은 상대에게 신뢰감을 느낀다. 사이 좋은 부활동료로써, 업무상의 상사나 부하 등.",
                    lois: "P",
                },
                {
                    dice: "71~75",
                    title: "집착",
                    desc: "당신은, 어쨌든 상대가 신경쓰인다. 잘 때에도, 식사 중에도, 상대가 머릿속에서 떠나지 않는다.",
                    lois: "P",
                },

                {
                    dice: "76~80",
                    title: "친근감",
                    desc: "당신은 상대가 남 같지 않다, 같은 취미, 생각을 가지고 있다 등.",
                    lois: "P",
                },
                {
                    dice: "81~85",
                    title: "성의",
                    desc: "당신은 상대에게 충실함을 느낀다. 공부나 일을 할 때의 주도성, 무슨 일이 있어도 약속을 지키는 신뢰감 등.",
                    lois: "P",
                },
                {
                    dice: "86~90",
                    title: "호의",
                    desc: "당신은 상대에게 호의를 가지고 있다. 성격, 몸가짐, 용모 등.",
                    lois: "P",
                },
                {
                    dice: "91~95",
                    title: "유위",
                    desc: "당신은 상대의 가능성을 보았다. 부활동에서 정규 선수로 발탁되거나, 오버드의 소질을 느끼는 등.",
                    lois: "P",
                },
                {
                    dice: "96~100",
                    title: "노력",
                    desc: "당신은 순수하게 노력하고 싶다고 생각한다. 상대의 목적에 공감했거나, 그저 그 사람의 매력을 느꼈다던가.",
                    lois: "P",
                },

                {
                    dice: "101",
                    title: "회구",
                    desc: "당신은 대상에게 어딘가 그리움을 느낀다. 죽은 친구와 닮았다, 사실은 과거에 만났다 같은 것.",
                    lois: "P",
                },
            ];
            return { dice: diceResult, list: emotionPlusList[diceResult] };
            break;
        case "emotion_minus":
            if (document.getElementById("inc_emo").checked) {
                diceResult = rollingDice(22) - 1;
            } else {
                diceResult = rollingDice(20);
            }

            let emotionMinusList = [
                {
                    dice: "0",
                    title: "모멸",
                    desc: "당신은 상대에게 모멸감을 느낀다. 오버드를 두려워하는 연구자, 평범함의 장점을 모르는 엘리트 등.",
                    lois: "N",
                },

                {
                    dice: "01~05",
                    title: "식상",
                    desc: "당신은 상대에게 식상함을 느낀다. 일방적인 애정을 주는 모친, 일방적인 사랑을 원하는 연인 등.",
                    lois: "N",
                },
                {
                    dice: "06~10",
                    title: "위협",
                    desc: "당신은 상대에게 위협을 느낀다. 강적의 전투력, 상대를 잃는 두려움 등.",
                    lois: "N",
                },
                {
                    dice: "11~15",
                    title: "질투",
                    desc: "당신은 상대를 질투한다. 자신이 잃어버린 '평범함'에, 자신보다 나은 능력 등.",
                    lois: "N",
                },
                {
                    dice: "16~20",
                    title: "회개",
                    desc: "당신은 상대를 보고 후회할 만한 과거를 떠올린다. 말하지 못한 말, 실력부족으로 잃어버린 사람의 기억 등.",
                    lois: "N",
                },
                {
                    dice: "21~25",
                    title: "공포",
                    desc: "당신은 상대에게 공포를 느낀다. 소실의 공포, 전투력의 공포, 너무나도 이질적인 정신의 공포 등.",
                    lois: "N",
                },

                {
                    dice: "26~30",
                    title: "불안",
                    desc: "당신은 상대에게 불안을 느낀다. 인격의 불안, 소실의 불안 등.",
                    lois: "N",
                },
                {
                    dice: "31~35",
                    title: "열등감",
                    desc: "당신은 상대에게 열등감을 가지고 있다. 자신이 잃어버린 '일상'을 가지고 있거나, 고결한 정신의 열등감을 느끼는 등.",
                    lois: "N",
                },
                {
                    dice: "36~40",
                    title: "소외감",
                    desc: "당신은 상대에게 소외감을 자극받고 있다. '평범한 일상'으로 돌아갈 수 없는 초조함 등.",
                    lois: "N",
                },
                {
                    dice: "41~45",
                    title: "치욕",
                    desc: "당신은 상대에게 받은 과거의 치욕을 떠올렸다. 과거의 패배, 실패, 실연 등.",
                    lois: "N",
                },
                {
                    dice: "46~50",
                    title: "연민",
                    desc: "당신은 상대에게 우월감같은 것을 느낀다. 압도적인 차이가 벌어지는 라이벌 등.",
                    lois: "N",
                },

                {
                    dice: "51~55",
                    title: "편애",
                    desc: "당신은 상대에게 치우쳐진 애정을 느낀다. 모친의 편애, 아버지의 편애, 아이의 편애 등.",
                    lois: "N",
                },
                {
                    dice: "56~60",
                    title: "증오",
                    desc: "당신은 상대에게 증오감을 느낀다. 과거에 당신의 소중한 사람을 상처입히거나, 생각방식에 찬동하지 않았다던가.",
                    lois: "N",
                },
                {
                    dice: "61~65",
                    title: "격의",
                    desc: "당신은 상대와 마음을 터놓을 수 없다는 것을 느낀다. 생각의 차이, 상대의 콤플렉스 등.",
                    lois: "N",
                },
                {
                    dice: "66~70",
                    title: "혐오",
                    desc: "당신은 상대를 혐오하고 있다. 성격이나 목소리가 마음에 들지 않아, 생각의 차이 등.",
                    lois: "N",
                },
                {
                    dice: "71~75",
                    title: "시의심",
                    desc: "당신은 상대를 의심한다. 진상은 알 수 없지만, 과거에 당신을 속인 사람과 닮았다 등.",
                    lois: "N",
                },

                {
                    dice: "76~80",
                    title: "싫증",
                    desc: "당신은 상대를 성가시거나 답답하다고 느낀다. 뜻이 맞지 않아, 따라다녀 등.",
                    lois: "N",
                },
                {
                    dice: "81~85",
                    title: "불신감",
                    desc: "당신은 상대를 신용할 수 없다. 본심을 읽을수가 없고, 위험한 냄새가 난다 등.",
                    lois: "N",
                },
                {
                    dice: "86~90",
                    title: "불쾌감",
                    desc: "당신은 상대를 불쾌하다 느낀다. 인격이나 태도 등 어딘가에 그렇게 느끼거나, 그 정도 등.",
                    lois: "N",
                },
                {
                    dice: "91~95",
                    title: "분함",
                    desc: "당신은 상대에게 분노나 분함을 느낀다. 그 자의 언동이나 생각방식, 태도 등.",
                    lois: "N",
                },
                {
                    dice: "96~100",
                    title: "적개심",
                    desc: "당신은 상대에게 적개심을 느낀다. 상대가 마음에 안 든다, 적으로 있는 게 재밌다고 생각한다 등.",
                    lois: "N",
                },

                {
                    dice: "101",
                    title: "무관심",
                    desc: "당신은 상대에게 흥미가 있어도 무관심하고 싶다고 생각한다. 사건에 휘말릴 것 같다는 예감이 든다 등.",
                    lois: "N",
                },
            ];
            return { dice: diceResult, list: emotionMinusList[diceResult] };
            break;
        default:
            break;
    }
}

function printLife(id, res) {
    document.getElementById("life_" + id).innerHTML = `<div class="dice">${res.dice}. ${
        res.list.title
    }</div><div class="lois">${res.list.lois ?? res.list.ren}</div><div class="desc">${
        res.list.desc
    }</div>`;
}

function rollingDxDice(dice, cri, plus) {
    let repeat = 1,
        sum = 0,
        log = [],
        success = 0;

    for (let i = 0; i < repeat; i++) {
        success = 0;
        let tmpLog = [];
        for (let j = 0; j < dice; j++) {
            let roll = Math.floor(Math.random() * 10) + 1;
            tmpLog.push(roll);

            if (roll >= cri) {
                success++;
            }
        }
        log.push("[" + tmpLog + "]");

        if (success > 0) {
            repeat++;
            dice = success;
            sum += 10;
        } else {
            tmpLog.sort().reverse();
            sum += tmpLog[0];
        }
    }

    let result = {
        sum: sum,
        log: log,
    };

    return result;
}

function rollingDice(dice) {
    let roll = Math.floor(Math.random() * dice) + 1;

    return roll;
}
})
