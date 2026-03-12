export const contacts = [
    /* 경영지원 / 대표 / 영업 */
    { id: 1, department: "대표", name: "김원식 대표", phone_number: "01093893880", internal_number: "" },
    { id: 2, department: "대표", name: "정운교 이사", phone_number: "01091901500", internal_number: "520" },
    { id: 3, department: "경영지원팀", name: "김정수 팀장", phone_number: "01071843880", internal_number: "500" },
    { id: 4, department: "경영지원팀", name: "김려화 주임", phone_number: "01083118422", internal_number: "502" },

    /* 생산관리팀 */
    { id: 5, department: "생산관리팀", name: "조현석 팀장", phone_number: "01062648987", internal_number: "518" },
    { id: 6, department: "생산관리팀", name: "문소연 과장", phone_number: "01023177435", internal_number: "531" },
    { id: 7, department: "생산관리팀", name: "이주현 대리", phone_number: "01089703026", internal_number: "522" },

    /* 품질관리팀 */
    { id: 8, department: "품질관리팀", name: "여상덕 팀장", phone_number: "01097976615", internal_number: "511" },
    { id: 9, department: "품질관리팀", name: "이슬기 과장", phone_number: "01036673094", internal_number: "514" },
    { id: 10, department: "품질관리팀", name: "김슬기 주임", phone_number: "01086809079", internal_number: "524" },
    { id: 11, department: "품질관리팀", name: "이현진 주임", phone_number: "01077230933", internal_number: "536" },
    { id: 12, department: "품질관리팀", name: "임성수 사원", phone_number: "01082497475", internal_number: "532" },
    { id: 13, department: "품질관리팀", name: "권준하 사원", phone_number: "01049917139", internal_number: "503" },

    /* 설비기술팀 (분리) */
    { id: 14, department: "설비기술팀", name: "김태건 팀장", phone_number: "01081262618", internal_number: "501" },
    { id: 15, department: "설비기술팀", name: "한동권 실장", phone_number: "01033449425", internal_number: "504" },
    { id: 16, department: "설비기술팀", name: "천을수 대리", phone_number: "01023515815", internal_number: "" },
    { id: 17, department: "설비기술팀", name: "이인혁 사원", phone_number: "01057370679", internal_number: "" },
    { id: 18, department: "설비기술팀", name: "오승영 사원", phone_number: "01097339828", internal_number: "" },

    /* 검사기술팀 (분리) */
    { id: 19, department: "검사기술팀", name: "이성민 팀장", phone_number: "01086670306", internal_number: "510" },
    { id: 20, department: "검사기술팀", name: "정태훈 대리", phone_number: "01055036406", internal_number: "513" },
    { id: 21, department: "검사기술팀", name: "강성우 사원", phone_number: "01053425675", internal_number: "" },

    /* 현장 조장 리스트 */
    { id: 22, department: "조장", name: "A조 AFVI 이원규", phone_number: "01065430376", internal_number: "540" },
    { id: 23, department: "조장", name: "B조 AFVI 허일영", phone_number: "01062166711", internal_number: "540" },
    { id: 24, department: "조장", name: "A조 번들 류용진", phone_number: "01082528898", internal_number: "547" },
    { id: 25, department: "조장", name: "B조 번들 황미란", phone_number: "01039432868", internal_number: "547" },
    { id: 26, department: "조장", name: "A조 VRS 정희자", phone_number: "01087619889", internal_number: "541" },
    { id: 27, department: "조장", name: "B조 VRS 하미연", phone_number: "01047540541", internal_number: "541" },
    { id: 28, department: "조장", name: "A조 OP 김동욱", phone_number: "01089780313", internal_number: "548" },
    { id: 29, department: "조장", name: "B조 OP 황정훈", phone_number: "01077079362", internal_number: "548" },
    { id: 30, department: "조장", name: "A조 목시 임향란", phone_number: "01077888364", internal_number: "542" },
    { id: 31, department: "조장", name: "B조 목시 안정미", phone_number: "01057544191", internal_number: "542" },

    /* 공정별 직통 번호 */
    { id: 32, department: "공정", name: "AFVI", phone_number: "03180633540", internal_number: "534/540" },
    { id: 33, department: "공정", name: "VRS", phone_number: "03180633541", internal_number: "541" },
    { id: 34, department: "공정", name: "목시", phone_number: "03180633542", internal_number: "542" },
    { id: 35, department: "공정", name: "LM", phone_number: "03180633544", internal_number: "544" },
    { id: 36, department: "공정", name: "수세", phone_number: "03180633545", internal_number: "545" },
    { id: 37, department: "공정", name: "RM", phone_number: "03180633548", internal_number: "548" },
    { id: 38, department: "공정", name: "번들", phone_number: "03180633547", internal_number: "547" },
    { id: 39, department: "공정", name: "반출입", phone_number: "03180633550", internal_number: "550" },
    { id: 40, department: "공정", name: "FQA", phone_number: "03180633546", internal_number: "546" },

    /* 통근버스 및 기타 */
    { id: 41, department: "통근버스", name: "온누리관광", phone_number: "0314053278", internal_number: "" },
    { id: 42, department: "통근버스", name: "시화차량", phone_number: "01037362959", internal_number: "" },
    { id: 43, department: "통근버스", name: "안산오전", phone_number: "01076394751", internal_number: "" },
    { id: 44, department: "통근버스", name: "안산오후", phone_number: "01088637705", internal_number: "" },
    { id: 45, department: "기타", name: "물류기사님", phone_number: "01055577037", internal_number: "" },
    { id: 46, department: "기타", name: "식당사장님", phone_number: "01087175335", internal_number: "" },
    { id: 47, department: "기타", name: "대전FAX", phone_number: "0429363710", internal_number: "" },
];
