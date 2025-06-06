const defaultDoc = {
    name: "Phiếu đánh giá thi đua cá nhân giáo viên năm 2024 - 2025 (Test)",
    section: [
        {
            title: "Tư tưởng chính trị",
            total_point: 15,
            is_total: true,
            content: [
                {
                    key: 0,
                    name: "Chấp hành tốt chủ trương chính sách của Đảng, pháp luật nhà nước",
                    point: 5,
                    sub_criteria: [],
                    supervisor: "6582b155be8b31b0ca5a87b9",
                    _id: "65b0c6894253074753416157",
                },
                {
                    key: 1,
                    name: "Phẩm chức đạo đức tốt, quan hệ tốt với đồng nghiệp, có uy tín với phụ huynh và học sinh; xây dựng tốt khối đoàn kết nội bộ: tác phong, ngôn phong đúng mực, giữ gìn uy tín của tập thể, đồng nghiệp trước phụ huynh, học sinh và xã hội, thực hiện đúng quy tắc ứng xử",
                    point: 10,
                    sub_criteria: [],
                    supervisor: "6582b155be8b31b0ca5a87b9",
                    _id: "65b0c6894253074753416158",
                },
                {
                    key: 2,
                    name: "Có tinh thần tự lực, tự cường, đoàn kết tương trợ, tích cực tham gia các phong trào thi đua, các cuộc vận động của ngành",
                    point: 0,
                    sub_criteria: [
                        {
                            name: "Nghỉ học chính trị có phép: - điểm/ 1 buổi",
                            parentKey: 2,
                            key: 3,
                            point: -1,
                            supervisor: "6582b155be8b31b0ca5a87bd",
                            _id: "65b0c689425307475341615a",
                        },
                        {
                            name: "Nghỉ học chính trị không phép: - điểm/ 1 buổi",
                            parentKey: 2,
                            key: 4,
                            point: -3,
                            supervisor: "6582b155be8b31b0ca5a87bd",
                            _id: "65b0c689425307475341615b",
                        },
                        {
                            name: "Không nộp bài thu hoạch (nếu có): - điểm/ 1 lần",
                            parentKey: 2,
                            key: 6,
                            point: -2,
                            supervisor: "6582b155be8b31b0ca5a87bd",
                            _id: "65b0c689425307475341615c",
                        },
                        {
                            name: "Không tham gia đóng góp các loại quỹ: - điểm/ 1 lần",
                            parentKey: 2,
                            key: 7,
                            point: -1,
                            supervisor: "6582b155be8b31b0ca5a87bd",
                            _id: "65b0c689425307475341615d",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87bd",
                    _id: "65b0c6894253074753416159",
                },
            ],
            _id: "65b0c6894253074753416156",
        },
        {
            title: "Thực hiện nhiệm vụ",
            total_point: 79,
            content: [
                {
                    key: 8,
                    name: "Giáo án đầy đủ, có thể hiện phương pháp mới, hướng dẫn phương pháp tự học cho học sinh: (dựa theo đánh giá kiểm tra giáo án của TTCM, BGH)",
                    point: 4,
                    sub_criteria: [
                        {
                            name: "Tốt",
                            parentKey: 8,
                            key: 11,
                            point: 4,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c6894253074753416160",
                        },
                        {
                            name: "Khá",
                            parentKey: 8,
                            key: 12,
                            point: 3,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c6894253074753416161",
                        },
                        {
                            name: "Đạt yêu cầu",
                            parentKey: 8,
                            key: 13,
                            point: 2,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c6894253074753416162",
                        },
                        {
                            name: "Không đạt yêu cầu",
                            parentKey: 8,
                            key: 14,
                            point: 0,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c6894253074753416163",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87cb",
                    _id: "65b0c689425307475341615f",
                },
                {
                    key: 9,
                    name: "Đảm bảo tiến độ thực hiện chương trình:",
                    point: 4,
                    sub_criteria: [
                        {
                            name: "Trễ, sớm 2 tuần, 3 tuần",
                            parentKey: 9,
                            key: 15,
                            point: -1,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c6894253074753416165",
                        },
                        {
                            name: "Trễ, sớm 4 tuần trở lên",
                            parentKey: 9,
                            key: 16,
                            point: -2,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c6894253074753416166",
                        },
                        {
                            name: "Không sử dụng đồ dùng dạy học đã có (do tổ bộ môn ghi nhận)",
                            parentKey: 9,
                            key: 17,
                            point: -2,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c6894253074753416167",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87cb",
                    _id: "65b0c6894253074753416164",
                },
                {
                    key: 18,
                    name: "Ghi và ký sổ đầu bài đầy đủ, kịp thời:",
                    point: 2,
                    sub_criteria: [
                        {
                            name: "Thiếu, trễ: - điểm/1 lần",
                            parentKey: 18,
                            key: 32,
                            point: -1,
                            supervisor: "6582b155be8b31b0ca5a87c9",
                            _id: "65b0c6894253074753416169",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87c9",
                    _id: "65b0c6894253074753416168",
                },
                {
                    key: 19,
                    name: "Dự giờ: 3 tiết/HK. GV thử việc dự 6 tiết/ HK",
                    point: 2,
                    sub_criteria: [
                        {
                            name: "Thiếu: - điểm/1 tiết",
                            parentKey: 19,
                            key: 33,
                            point: -1,
                            supervisor: "6582b155be8b31b0ca5a87c9",
                            _id: "65b0c689425307475341616b",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87c9",
                    _id: "65b0c689425307475341616a",
                },
                {
                    key: 20,
                    name: "Không đi trễ về sớm, không bỏ tiết, bỏ giờ:",
                    point: 6,
                    sub_criteria: [
                        {
                            name: "Trễ dưới 5 phút : - điểm/1 lần",
                            parentKey: 20,
                            key: 34,
                            point: -1,
                            supervisor: "6582b155be8b31b0ca5a87c9",
                            _id: "65b0c689425307475341616d",
                        },
                        {
                            name: "Trễ từ 5 phút trở lên : - điểm/1 lần",
                            parentKey: 20,
                            key: 35,
                            point: -2,
                            supervisor: "6582b155be8b31b0ca5a87c9",
                            _id: "65b0c689425307475341616e",
                        },
                        {
                            name: "Nghỉ có phép có dạy bù hoặc có dạy tương trợ cùng môn : - điểm/1 tiết",
                            parentKey: 20,
                            key: 36,
                            point: 0,
                            supervisor: "6582b155be8b31b0ca5a87c9",
                            _id: "65b0c689425307475341616f",
                        },
                        {
                            name: "Nghỉ có phép không dạy bù hay không có dạy tương trợ cùng môn: - điểm/1 tiết",
                            parentKey: 20,
                            key: 37,
                            point: -1,
                            supervisor: "6582b155be8b31b0ca5a87c9",
                            _id: "65b0c6894253074753416170",
                        },
                        {
                            name: "Nghỉ không phép: - điểm/1 tiết",
                            parentKey: 20,
                            key: 38,
                            point: -6,
                            supervisor: "6582b155be8b31b0ca5a87c9",
                            _id: "65b0c6894253074753416171",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87c9",
                    _id: "65b0c689425307475341616c",
                },
                {
                    key: 21,
                    name: "Tham gia hội họp đầy đủ, tham dự bồi dưỡng chuyên môn nghiệp vụ theo quy định:",
                    point: 4,
                    sub_criteria: [
                        {
                            name: " Vắng họp hội đồng, sinh hoạt toàn trường, khai giảng, sơ tổng kết, hội nghị không phép: - điểm/1 lần",
                            parentKey: 21,
                            key: 39,
                            point: -2,
                            supervisor: "6582b155be8b31b0ca5a87c1",
                            _id: "65b0c6894253074753416173",
                        },
                        {
                            name: " Vắng họp hội đồng, sinh hoạt toàn trường, khai giảng, sơ tổng kết, hội nghị có phép: - điểm/1 lần",
                            parentKey: 21,
                            key: 40,
                            point: 0,
                            supervisor: "6582b155be8b31b0ca5a87c1",
                            _id: "65b0c6894253074753416174",
                        },
                        {
                            name: "Vắng sinh hoạt chuyên môn tổ không phép: - điểm/1 lần",
                            parentKey: 21,
                            key: 41,
                            point: -1,
                            supervisor: "6582b155be8b31b0ca5a87c1",
                            _id: "65b0c6894253074753416175",
                        },
                        {
                            name: "Vắng sinh hoạt chuyên môn tổ có phép: - điểm/1 lần",
                            parentKey: 21,
                            key: 42,
                            point: -0.5,
                            supervisor: "6582b155be8b31b0ca5a87c1",
                            _id: "65b0c6894253074753416176",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87c1",
                    _id: "65b0c6894253074753416172",
                },
                {
                    key: 22,
                    name: "Thực hiện hồ sơ, sổ sách chuyên môn đầy đủ, rõ ràng, cập nhật thường xuyên:",
                    point: 4,
                    sub_criteria: [
                        {
                            name: " Hoàn thành đầy đủ đúng hạn",
                            parentKey: 22,
                            key: 43,
                            point: 4,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c6894253074753416178",
                        },
                        {
                            name: "Không hoàn thành:  (thiếu từ 1 hồ sơ hoặc từ 1 hồ sơ không đúng quy định)",
                            parentKey: 22,
                            key: 44,
                            point: -4,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c6894253074753416179",
                        },
                        {
                            name: "Hoàn thành trễ theo quy định : - điểm/lần",
                            parentKey: 22,
                            key: 45,
                            point: -2,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c689425307475341617a",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87cb",
                    _id: "65b0c6894253074753416177",
                },
                {
                    key: 23,
                    name: "Có chuyên đề chuyên môn thao giảng với nhà trường.",
                    point: 4,
                    sub_criteria: [],
                    supervisor: "6582b155be8b31b0ca5a87cb",
                    _id: "65b0c689425307475341617b",
                },
                {
                    key: 24,
                    name: "Có chuyên đề chuyên môn thao giảng với nhà trường ngoại khóa cấp cụm",
                    point: 6,
                    sub_criteria: [],
                    supervisor: "6582b155be8b31b0ca5a87cb",
                    _id: "65b0c689425307475341617c",
                },
                {
                    key: 25,
                    name: "Có sáng kiến hoặc kinh nghiệm, giải pháp được phổ biến trong tổ, khối\nhoặc toàn trường, giúp đỡ đồng nghiệp trong chuyên môn, dạy tương trợ",
                    point: 4,
                    sub_criteria: [
                        {
                            name: " Có sáng kiến (đăng ký thi đua đầu năm)",
                            parentKey: 25,
                            key: 46,
                            point: 2,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c689425307475341617e",
                        },
                        {
                            name: "Có giải pháp (phải có biên bản tổ ghi nhận, cá nhân phải báo cáo qua tổ bộ môn)",
                            parentKey: 25,
                            key: 47,
                            point: 2,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c689425307475341617f",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87cb",
                    _id: "65b0c689425307475341617d",
                },
                {
                    key: 26,
                    name: "Chất lượng học tập của học sinh đạt yêu cầu (dựa vào tỉ lệ % số bài KTHK trên trung bình của cá nhân so với tỉ lệ % số bài KTHK trên trung bình khối bộ môn): ",
                    point: 14,
                    sub_criteria: [
                        {
                            name: "Cao hơn: 5% trở lên",
                            parentKey: 26,
                            key: 97,
                            point: 14,
                            supervisor: "6582b155be8b31b0ca5a87bf",
                            _id: "65b3593e4bfa5fe175ba8f4f",
                        },
                        {
                            name: "Bằng hoặc cao hơn dưới 5%",
                            parentKey: 26,
                            key: 98,
                            point: 10,
                            supervisor: "6582b155be8b31b0ca5a87bf",
                            _id: "65b3593e4bfa5fe175ba8f50",
                        },
                        {
                            name: "Thấp hơn đến 9.9%",
                            parentKey: 26,
                            key: 99,
                            point: 8,
                            supervisor: "6582b155be8b31b0ca5a87bf",
                            _id: "65b3593e4bfa5fe175ba8f51",
                        },
                        {
                            name: "Thấp hơn: 10% - 19.9%",
                            parentKey: 26,
                            key: 100,
                            point: 5,
                            supervisor: "6582b155be8b31b0ca5a87bf",
                            _id: "65b3593e4bfa5fe175ba8f52",
                        },
                        {
                            name: "Thấp hơn: ≥ 20%",
                            parentKey: 26,
                            key: 101,
                            point: 0,
                            supervisor: "6582b155be8b31b0ca5a87bf",
                            _id: "65b3593e4bfa5fe175ba8f53",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87bf",
                    _id: "65b0c6894253074753416180",
                },
                {
                    key: 27,
                    name: "Thực hiện đổi mới phương pháp dạy học đạt hiệu quả cao: học sinh chủ động, hứng thú học tập, thực hành vận dụng tốt, lớp học sinh động (dựa theo đánh giá trên phiếu dự giờ của giáo viên được BGH và đồng nghiệp đánh giá):",
                    point: 10,
                    sub_criteria: [
                        {
                            name: "Đăng ký và dạy tiết tốt",
                            parentKey: 27,
                            key: 53,
                            point: 3,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c6894253074753416187",
                        },
                        {
                            name: "Giáo án điện tử, ứng dụng CNTT trong dạy học, chuyển đổi số.",
                            parentKey: 27,
                            key: 54,
                            point: 4,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c6894253074753416188",
                        },
                        {
                            name: "Tiết tốt",
                            parentKey: 27,
                            key: 55,
                            point: 3,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c6894253074753416189",
                        },
                        {
                            name: "Tiết khá",
                            parentKey: 27,
                            key: 56,
                            point: 2,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c689425307475341618a",
                        },
                        {
                            name: "Tiết đạt yêu cầu",
                            parentKey: 27,
                            key: 57,
                            point: 1,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c689425307475341618b",
                        },
                        {
                            name: "Tiết không đạt yêu cầu",
                            parentKey: 27,
                            key: 58,
                            point: 0,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c689425307475341618c",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87cb",
                    _id: "65b0c6894253074753416186",
                },
                {
                    key: 28,
                    name: "Chấm sửa, trả bài đúng qui định, đúng thực chất, nộp đề kiểm tra:",
                    point: 6,
                    sub_criteria: [
                        {
                            name: "Chấm bài thi HK mỗi bài sai lệch hơn 1 điểm (môn XH), 0.5 điểm (môn TN)",
                            parentKey: 28,
                            key: 59,
                            point: -0.5,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c689425307475341618e",
                        },
                        {
                            name: "Thất lạc bài kiểm tra giữa kỳ, học kỳ",
                            parentKey: 28,
                            key: 60,
                            point: -6,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c689425307475341618f",
                        },
                        {
                            name: "Nộp đề kiểm tra (định kỳ) trễ 1 ngày/1 lần KT: - điểm/1 lần",
                            parentKey: 28,
                            key: 61,
                            point: -1,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c6894253074753416190",
                        },
                        {
                            name: "Không nộp đề kiểm tra (định kỳ)",
                            parentKey: 28,
                            key: 62,
                            point: -6,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c6894253074753416191",
                        },
                        {
                            name: "Nộp đề KT (định kỳ) không đúng ma trận thống nhất trong TCM hoặc đề, đáp án sai, thiếu: - điểm/1 lần",
                            parentKey: 28,
                            key: 63,
                            point: -3,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c6894253074753416192",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87cb",
                    _id: "65b0c689425307475341618d",
                },
                {
                    key: 29,
                    name: "Thực hiện đúng, đủ điểm số theo quy định:",
                    point: 4,
                    sub_criteria: [
                        {
                            name: "Ghi sai điểm ở học bạ từ lỗi thứ 5 trở lên: - điểm/1 lỗi",
                            parentKey: 29,
                            key: 64,
                            point: -0.5,
                            supervisor: "6582b155be8b31b0ca5a87c7",
                            _id: "65b0c6894253074753416194",
                        },
                        {
                            name: "Sai không sửa: - điểm/1 lỗi",
                            parentKey: 29,
                            key: 65,
                            point: -1,
                            supervisor: "6582b155be8b31b0ca5a87c7",
                            _id: "65b0c6894253074753416195",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87c7",
                    _id: "65b0c6894253074753416193",
                },
                {
                    key: 30,
                    name: "Tự học nâng cao trình độ chuyên môn, nghiệp vụ, chính trị: Dựa vào kết quả tự bồi dưỡng theo KH cá nhân",
                    point: 2,
                    sub_criteria: [],
                    supervisor: "6582b155be8b31b0ca5a87c7",
                    _id: "65b0c6894253074753416196",
                },
                {
                    key: 31,
                    name: "Tham gia họat động ngoại khóa của nhà trường (nếu có tổ chức)",
                    point: 3,
                    sub_criteria: [
                        {
                            name: "Tham gia theo kế hoạch tổ đề ra",
                            parentKey: 31,
                            key: 66,
                            point: 1.5,
                            supervisor: "6582b155be8b31b0ca5a87c7",
                            _id: "65b0c6894253074753416198",
                        },
                        {
                            name: "Trực tiếp tham gia tại buổi ngoại khóa",
                            parentKey: 31,
                            key: 67,
                            point: 1.5,
                            supervisor: "6582b155be8b31b0ca5a87c7",
                            _id: "65b0c6894253074753416199",
                        },
                        {
                            name: "Không tham gia - điểm/lần",
                            parentKey: 31,
                            key: 68,
                            point: -3,
                            supervisor: "6582b155be8b31b0ca5a87c7",
                            _id: "65b0c689425307475341619a",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87c7",
                    _id: "65b0c6894253074753416197",
                },
            ],
            _id: "65b0c689425307475341615e",
        },
        {
            title: "Công tác kiêm nhiệm - phong trào",
            total_point: 10,
            content: [
                {
                    key: 69,
                    name: "Công tác kiêm nhiệm:",
                    point: 7,
                    sub_criteria: [
                        {
                            name: "Xuất sắc",
                            parentKey: 69,
                            key: 70,
                            point: 7,
                            supervisor: "6582b155be8b31b0ca5a87c3",
                            _id: "65b0c689425307475341619d",
                        },
                        {
                            name: "Tốt",
                            parentKey: 69,
                            key: 71,
                            point: 6,
                            supervisor: "6582b155be8b31b0ca5a87c3",
                            _id: "65b0c689425307475341619e",
                        },
                        {
                            name: "Khá",
                            parentKey: 69,
                            key: 72,
                            point: 5,
                            supervisor: "6582b155be8b31b0ca5a87c3",
                            _id: "65b0c689425307475341619f",
                        },
                        {
                            name: "Đạt yêu cầu",
                            parentKey: 69,
                            key: 73,
                            point: 3,
                            supervisor: "6582b155be8b31b0ca5a87c3",
                            _id: "65b0c68942530747534161a0",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87c3",
                    _id: "65b0c689425307475341619c",
                },
                {
                    key: 74,
                    name: "Tham gia phong trào văn thể mỹ do ngành, cụm, trường phát động (theo bảng thống kê tham gia phong trào của từng đợt thi đua), tham gia chuẩn bị các sự kiện, Lễ, Hội của nhà trường",
                    point: 3,
                    sub_criteria: [
                        {
                            name: "Cấp Ngành",
                            parentKey: 74,
                            key: 75,
                            point: 3,
                            supervisor: "6582b155be8b31b0ca5a87c3",
                            _id: "65b0c68942530747534161a2",
                        },
                        {
                            name: "Cấp Cụm",
                            parentKey: 74,
                            key: 76,
                            point: 2,
                            supervisor: "6582b155be8b31b0ca5a87c3",
                            _id: "65b0c68942530747534161a3",
                        },
                        {
                            name: "Cấp trường (Cho từng đợt)",
                            parentKey: 74,
                            key: 77,
                            point: 1,
                            supervisor: "6582b155be8b31b0ca5a87c3",
                            _id: "65b0c68942530747534161a4",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87c3",
                    _id: "65b0c68942530747534161a1",
                },
            ],
            _id: "65b0c689425307475341619b",
        },
        {
            title: "Điểm thưởng",
            total_point: 31,
            content: [
                {
                    key: 78,
                    name: "Giáo viên bồi dưỡng HS giỏi TP (Lớp 12),  GV dạy QPAN, TDTT có giải cấp TP, QG - Văn nghệ, HSG máy tính cầm tay (Có giải)",
                    point: 6,
                    sub_criteria: [
                        {
                            name: "Giải Nhất",
                            parentKey: 78,
                            key: 82,
                            point: 6,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c68942530747534161a7",
                        },
                        {
                            name: "Giải Nhì",
                            parentKey: 78,
                            key: 83,
                            point: 5,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c68942530747534161a8",
                        },
                        {
                            name: "Giải Ba",
                            parentKey: 78,
                            key: 84,
                            point: 4,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c68942530747534161a9",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87cb",
                    _id: "65b0c68942530747534161a6",
                },
                {
                    key: 79,
                    name: "Giáo viên bồi dưỡng học sinh giỏi Olympic không chuyên TP (lớp 10,11)",
                    point: 4,
                    sub_criteria: [
                        {
                            name: "Huy chương Vàng",
                            parentKey: 79,
                            key: 89,
                            point: 4,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c68942530747534161ab",
                        },
                        {
                            name: "Huy chương Bạc",
                            parentKey: 79,
                            key: 90,
                            point: 3,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c68942530747534161ac",
                        },
                        {
                            name: "Huy chương Đồng",
                            parentKey: 79,
                            key: 91,
                            point: 2,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b0c68942530747534161ad",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87cb",
                    _id: "65b0c68942530747534161aa",
                },
                {
                    key: 80,
                    name: "Giáo viên phụ trách câu lạc bộ có giải:",
                    point: 2,
                    sub_criteria: [
                        {
                            name: "Cấp thành phố",
                            parentKey: 80,
                            key: 95,
                            point: 2,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b233be425307475341b1b5",
                        },
                        {
                            name: "Cấp cụm",
                            parentKey: 80,
                            key: 96,
                            point: 1,
                            supervisor: "6582b155be8b31b0ca5a87cb",
                            _id: "65b233be425307475341b1b6",
                        },
                    ],
                    supervisor: "6582b155be8b31b0ca5a87cb",
                    _id: "65b0c68942530747534161ae",
                },
                {
                    key: 81,
                    name: "Giáo viên hướng dẫn học sinh nghiên cứu khoa học có giải cấp TP",
                    point: 6,
                    sub_criteria: [],
                    supervisor: "6582b155be8b31b0ca5a87cb",
                    _id: "65b0c68942530747534161b1",
                },
                {
                    key: 92,
                    name: 'Giáo viên đạt giải "Giáo viên sáng tạo trên nền tảng CNTT"',
                    point: 6,
                    sub_criteria: [],
                    supervisor: "6582b155be8b31b0ca5a87cb",
                    _id: "65b0c68942530747534161b2",
                },
                {
                    key: 93,
                    name: "Giáo viên đạt giải khi tham gia phong trào văn thể mỹ do Công đoàn ngành phát động",
                    point: 5,
                    sub_criteria: [],
                    supervisor: "6582b155be8b31b0ca5a87cb",
                    _id: "65b0c68942530747534161b3",
                },
                {
                    key: 94,
                    name: "Giáo viên tham gia dạy BD HSG, NCKHKT, HSG máy tính cầm tay, các cuộc thi liên quan đến chuyển đổi số.",
                    point: 2,
                    sub_criteria: [],
                    supervisor: "6582b155be8b31b0ca5a87cb",
                    _id: "65b0c68942530747534161b4",
                },
            ],
            _id: "65b0c68942530747534161a5",
        },
    ],
    last_key: 101,
    supervisor_list: [
        "6582b155be8b31b0ca5a87b9",
        "6582b155be8b31b0ca5a87bd",
        "6582b155be8b31b0ca5a87cb",
        "6582b155be8b31b0ca5a87c9",
        "6582b155be8b31b0ca5a87c1",
        "6582b155be8b31b0ca5a87bf",
        "6582b155be8b31b0ca5a87c7",
        "6582b155be8b31b0ca5a87c3",
    ],
}

export default defaultDoc
