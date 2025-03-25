class OrderManager {
    constructor() {
        this.selectedItems = new Set();
        this.cities = {
            "hanoi": "Hà Nội",
            "hcm": "TP. Hồ Chí Minh",
            "danang": "Đà Nẵng",
            "haiphong": "Hải Phòng",
            "cantho": "Cần Thơ",
            "binhduong": "Bình Dương",
            "dongnai": "Đồng Nai",
            "quangninh": "Quảng Ninh",
            "thaibinh": "Thái Bình",
            "namdinh": "Nam Định"
        };

        this.districts = {
            "hanoi": ["Ba Đình", "Cầu Giấy", "Đống Đa", "Hai Bà Trưng", "Hoàn Kiếm", "Long Biên", "Từ Liêm", "Thanh Xuân"],
            "hcm": ["Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 9", "Quận 10"],
            "danang": ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Liên Chiểu", "Cẩm Lệ"],
            "haiphong": ["Hồng Bàng", "Ngô Quyền", "Lê Chân", "Hải An", "Kiến An", "Đồ Sơn"],
            "cantho": ["Ninh Kiều", "Bình Thuỷ", "Cái Răng", "Ô Môn", "Thốt Nốt"],
            "binhduong": ["Thủ Dầu Một", "Thuận An", "Dĩ An", "Tân Uyên", "Bến Cát"],
            "dongnai": ["Biên Hoà", "Long Khánh", "Long Thành", "Nhơn Trạch", "Trảng Bom"],
            "quangninh": ["Hạ Long", "Cẩm Phả", "Uông Bí", "Móng Cái", "Cô Tô"],
            "thaibinh": ["Thái Bình", "Quỳnh Phụ", "Hưng Hà", "Đông Hưng", "Vũ Thư"],
            "namdinh": ["Nam Định", "Mỹ Lộc", "Vụ Bản", "Ý Yên", "Nghĩa Hưng"]
        };

        this.wards = {
            "Ba Đình": ["Liễu Giai", "Kim Mã", "Láng Hạ", "Láng Thượng", "Cống Vị", "Điện Biên", "Đội Cấn", "Giảng Võ", "Láng Hạ", "Láng Thượng", "Liễu Giai", "Ngọc Hà", "Ngọc Khánh", "Phúc Xá", "Quán Thánh", "Thành Công", "Trúc Bạch", "Vĩnh Phúc"],
            "Cầu Giấy": ["Dịch Vọng", "Dịch Vọng Hậu", "Mai Dịch", "Nghĩa Đô", "Nghĩa Tân", "Quan Hoa", "Yên Hòa", "Trung Hòa", "Dịch Vọng", "Dịch Vọng Hậu", "Mai Dịch", "Nghĩa Đô", "Nghĩa Tân", "Quan Hoa", "Yên Hòa", "Trung Hòa"],
            "Đống Đa": ["Cát Linh", "Hàng Bột", "Khâm Thiên", "Khương Thượng", "Kim Liên", "Láng Thượng", "Nam Đồng", "Ngã Tư Sở", "Phương Liệt", "Quang Trung", "Quốc Tử Giám", "Thịnh Quang", "Thổ Quan", "Trung Liệt", "Trung Phụng", "Trung Tự", "Văn Chương", "Văn Miếu", "Xã Đàn"],
            "Hai Bà Trưng": ["Bách Khoa", "Bạch Đằng", "Bạch Mai", "Cầu Dền", "Đống Mác", "Đồng Nhân", "Đồng Tâm", "Lê Đại Hành", "Minh Khai", "Ngô Thì Nhậm", "Nguyễn Du", "Phạm Đình Hổ", "Phố Huế", "Quỳnh Lôi", "Thanh Lương", "Thanh Nhàn", "Trương Định", "Vĩnh Tuy"],
            "Hoàn Kiếm": ["Chương Dương", "Cửa Đông", "Cửa Nam", "Đồng Xuân", "Hàng Bạc", "Hàng Bài", "Hàng Bồ", "Hàng Bông", "Hàng Buồm", "Hàng Đào", "Hàng Gai", "Hàng Mã", "Hàng Trống", "Lý Thái Tổ", "Phan Chu Trinh", "Tràng Tiền"],
            "Long Biên": ["Bồ Đề", "Cự Khối", "Đức Giang", "Gia Thụy", "Giang Biên", "Long Biên", "Ngọc Lâm", "Ngọc Thụy", "Phúc Đồng", "Phúc Lợi", "Sài Đồng", "Thạch Bàn", "Thượng Thanh", "Việt Hưng"],
            "Từ Liêm": ["Cổ Nhuế", "Đông Ngạc", "Đức Thắng", "Liên Mạc", "Minh Khai", "Phú Diễn", "Phúc Diễn", "Tây Tựu", "Thụy Phương", "Xuân Đỉnh", "Xuân Phương"],
            "Thanh Xuân": ["Hạ Đình", "Khương Đình", "Khương Mai", "Kim Giang", "Nhân Chính", "Phương Liệt", "Thanh Xuân Bắc", "Thanh Xuân Nam", "Thanh Xuân Trung", "Thượng Đình"],
            "Quận 1": ["Bến Nghé", "Bến Thành", "Cầu Kho", "Cầu Ông Lãnh", "Cô Giang", "Đa Kao", "Nguyễn Cư Trinh", "Nguyễn Thái Bình", "Phạm Ngũ Lão", "Tân Định"],
            "Quận 2": ["An Khánh", "An Lợi Đông", "An Phú", "Bình An", "Bình Khánh", "Bình Trưng Đông", "Bình Trưng Tây", "Cát Lái", "Thạnh Mỹ Lợi", "Thảo Điền", "Thủ Thiêm"],
            "Quận 3": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14"],
            "Quận 4": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15", "Phường 16", "Phường 17", "Phường 18"],
            "Quận 5": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
            "Quận 6": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14"],
            "Quận 7": ["Bình Thuận", "Phú Mỹ", "Phú Thuận", "Tân Hưng", "Tân Kiểng", "Tân Phong", "Tân Quy", "Tân Thuận Đông", "Tân Thuận Tây"],
            "Quận 8": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15", "Phường 16"],
            "Quận 9": ["Hiệp Phú", "Long Bình", "Long Phước", "Long Thạnh Mỹ", "Long Trường", "Phú Hữu", "Phước Bình", "Phước Long A", "Phước Long B", "Tăng Nhơn Phú A", "Tăng Nhơn Phú B", "Trường Thạnh"],
            "Quận 10": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
            "Hải Châu": ["Bình Hiên", "Bình Thuận", "Hải Châu I", "Hải Châu II", "Hòa Cường Bắc", "Hòa Cường Nam", "Hòa Thuận", "Nam Dương", "Phước Ninh", "Thạch Thang", "Thanh Bình", "Thuận Phước"],
            "Thanh Khê": ["An Khê", "Chính Gián", "Hòa Khê", "Tam Thuận", "Tân Chính", "Thạc Gián", "Thanh Khê Đông", "Thanh Khê Tây", "Vĩnh Trung", "Xuân Hà"],
            "Sơn Trà": ["An Hải Bắc", "An Hải Đông", "An Hải Nam", "An Hải Tây", "Mân Thái", "Nại Hiên Đông", "Phước Mỹ", "Thọ Quang", "Thọ Quang", "Thọ Quang"],
            "Ngũ Hành Sơn": ["Hòa Hải", "Hòa Quý", "Khuê Mỹ", "Mỹ An"],
            "Liên Chiểu": ["Hòa Hiệp Bắc", "Hòa Hiệp Nam", "Hòa Khánh Bắc", "Hòa Khánh Nam", "Hòa Minh"],
            "Cẩm Lệ": ["Hòa An", "Hòa Phát", "Hòa Thọ Đông", "Hòa Thọ Tây", "Hòa Xuân", "Khuê Trung"],
            "Hồng Bàng": ["Hạ Lý", "Hoàng Văn Thụ", "Hùng Vương", "Minh Khai", "Nam Sơn", "Phạm Hồng Thái", "Phan Bội Châu", "Quang Trung", "Quán Toan", "Sở Dầu", "Thượng Lý", "Trại Chuối"],
            "Ngô Quyền": ["Cầu Đất", "Cầu Tre", "Đằng Giang", "Đông Khê", "Đồng Quốc Bình", "Gia Viên", "Lạc Viên", "Lê Lợi", "Lương Khánh Thiện", "Máy Chai", "Máy Tơ", "Vạn Mỹ"],
            "Lê Chân": ["An Biên", "An Dương", "Cát Dài", "Đằng Hải", "Đông Hải", "Hàng Kênh", "Hồ Nam", "Lam Sơn", "Nghĩa Xá", "Niệm Nghĩa", "Trại Cau", "Trần Nguyên Hãn", "Vĩnh Niệm"],
            "Hải An": ["Đông Hải 1", "Đông Hải 2", "Nam Hải", "Thành Tô", "Tràng Cát"],
            "Kiến An": ["Bắc Sơn", "Đồng Hòa", "Lãm Hà", "Nam Sơn", "Ngọc Sơn", "Phù Liễn", "Quán Trữ", "Tràng Minh", "Trần Thành Ngọ", "Văn Đẩu", "Văn Học"],
            "Đồ Sơn": ["Bàng La", "Hợp Đức", "Minh Đức", "Ngọc Hải", "Ngọc Xuyên", "Vạn Hương", "Vạn Sơn"],
            "Ninh Kiều": ["An Bình", "An Cư", "An Hòa", "An Khánh", "An Nghiệp", "An Phú", "Cái Khế", "Hưng Lợi", "Tân An", "Thới Bình", "Xuân Khánh"],
            "Bình Thuỷ": ["An Thới", "Bình Thuỷ", "Bùi Hữu Nghĩa", "Long Hòa", "Long Tuyền", "Thới An Đông", "Trà An", "Trà Nóc"],
            "Cái Răng": ["Ba Láng", "Hưng Phú", "Hưng Thạnh", "Lê Bình", "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Tân Phú", "Thường Thạnh"],
            "Ô Môn": ["Châu Văn Liêm", "Long Hưng", "Phước Thới", "Thới An", "Thới Hòa", "Thới Long", "Trường Lạc", "Trường Thành", "Trường Thới", "Trường Thới A", "Trường Thới B"],
            "Thốt Nốt": ["Tân Hưng", "Tân Lộc", "Thạnh Hòa", "Thạnh Lộc", "Thới Thuận", "Thuận An", "Thuận Hưng", "Trung Kiên", "Trung Nhứt", "Trung Thạnh"],
            "Thủ Dầu Một": ["Chánh Mỹ", "Chánh Nghĩa", "Định Hòa", "Hiệp An", "Hiệp Thành", "Hòa Phú", "Phú Cường", "Phú Hòa", "Phú Lợi", "Phú Mỹ", "Phú Tân", "Phú Thọ", "Tân An", "Tương Bình Hiệp"],
            "Thuận An": ["An Phú", "An Sơn", "An Thạnh", "Bình Chuẩn", "Bình Hòa", "Bình Nhâm", "Hưng Định", "Lái Thiêu", "Tân Định", "Tân Bình", "Vĩnh Phú"],
            "Dĩ An": ["An Bình", "An Thạnh", "Bình An", "Bình Thắng", "Dĩ An", "Đông Hòa", "Tân Bình", "Tân Đông Hiệp"],
            "Tân Uyên": ["Bạch Đằng", "Hội Nghĩa", "Khánh Bình", "Phú Chánh", "Tân Hiệp", "Tân Phước Khánh", "Tân Vĩnh Hiệp", "Thái Hòa", "Thạnh Phước", "Uyên Hưng", "Vĩnh Tân"],
            "Bến Cát": ["An Điền", "An Tây", "Cây Trường II", "Chánh Phú Hòa", "Hòa Lợi", "Mỹ Phước", "Phú An", "Tân Định", "Thới Hòa"],
            "Biên Hoà": ["An Bình", "Bình Đa", "Bửu Hòa", "Bửu Long", "Hố Nai", "Hóa An", "Hòa Bình", "Long Bình", "Long Bình Tân", "Quang Vinh", "Quyết Thắng", "Tam Hiệp", "Tam Hòa", "Tân Biên", "Tân Hạnh", "Tân Hiệp", "Tân Mai", "Tân Phong", "Tân Tiến", "Tân Vạn", "Thanh Bình", "Thống Nhất", "Trảng Dài", "Trung Dũng"],
            "Long Khánh": ["Bảo Quang", "Bảo Vinh", "Bàu Sen", "Bàu Trâm", "Bình Lộc", "Hàng Gòn", "Long Bình Tân", "Phú Bình", "Suối Tre", "Tam Bình", "Tân Bình", "Tân Lập", "Tân Phú", "Tân Tiến", "Thanh Bình", "Xuân An", "Xuân Bình", "Xuân Hòa", "Xuân Lập", "Xuân Tân", "Xuân Thanh", "Xuân Trường"],
            "Long Thành": ["An Phước", "Bàu Cạn", "Bình An", "Bình Sơn", "Cẩm Đường", "Lộc An", "Long An", "Long Đức", "Long Phước", "Long Thành", "Phước Bình", "Phước Thái", "Suối Trầu", "Tam An", "Tân Hiệp", "Tân Long", "Thanh An"],
            "Nhơn Trạch": ["Đại Phước", "Hiệp Phước", "Long Tân", "Long Thọ", "Phú Đông", "Phú Hội", "Phú Hữu", "Phú Thạnh", "Phước An", "Phước Khánh", "Phước Thiền", "Vĩnh Thanh"],
            "Trảng Bom": ["An Viễn", "Bắc Sơn", "Bình Minh", "Cây Gáo", "Đông Hòa", "Đồi 61", "Giang Điền", "Hố Nai 3", "Hưng Thịnh", "Quảng Tiến", "Sông Thao", "Sông Trầu", "Tây Hòa", "Thanh Bình", "Trung Hòa"],
            "Hạ Long": ["Bạch Đằng", "Bãi Cháy", "Cao Thắng", "Cao Xanh", "Đại Yên", "Giếng Đáy", "Hà Khánh", "Hà Khẩu", "Hà Lầm", "Hà Phong", "Hà Trung", "Hà Tu", "Hồng Gai", "Hồng Hà", "Hồng Hải", "Hùng Thắng", "Trần Hưng Đạo", "Tuần Châu", "Việt Hưng", "Yết Kiêu"],
            "Cẩm Phả": ["Cẩm Bình", "Cẩm Đông", "Cẩm Phú", "Cẩm Sơn", "Cẩm Tây", "Cẩm Thạch", "Cẩm Thành", "Cẩm Thịnh", "Cẩm Thuỷ", "Cẩm Trung", "Cửa Ông", "Mông Dương", "Quang Hanh"],
            "Uông Bí": ["Bắc Sơn", "Nam Khê", "Phương Đông", "Phương Nam", "Quang Trung", "Thanh Sơn", "Trưng Vương", "Vàng Danh", "Yên Thanh"],
            "Móng Cái": ["Bình Ngọc", "Hải Hoà", "Hải Yên", "Hoà Lạc", "Ka Long", "Ninh Dương", "Quảng Nghĩa", "Trà Cổ", "Trần Phú"],
            "Cô Tô": ["Cô Tô", "Đồng Tiến", "Thanh Lân"],
            "Thái Bình": ["Bồ Xuyên", "Đề Thám", "Hoàng Diệu", "Kỳ Bá", "Lê Hồng Phong", "Phú Khánh", "Quang Trung", "Tiền Phong", "Trần Hưng Đạo", "Trần Lâm", "Vũ Phúc", "Vũ Chính", "Vũ Đông", "Vũ Lạc", "Vũ Sơn"],
            "Quỳnh Phụ": ["An Ấp", "An Bài", "An Cầu", "An Đồng", "An Dục", "An Hiệp", "An Khê", "An Lễ", "An Mỹ", "An Ninh", "An Quí", "An Thái", "An Thanh", "An Tràng", "An Vinh", "An Vũ", "Đông Hải", "Đồng Tiến", "Quỳnh Bảo", "Quỳnh Giao", "Quỳnh Hải", "Quỳnh Hoa", "Quỳnh Hoàng", "Quỳnh Hội", "Quỳnh Khê", "Quỳnh Lâm", "Quỳnh Minh", "Quỳnh Mỹ", "Quỳnh Ngọc", "Quỳnh Nguyên", "Quỳnh Sơn", "Quỳnh Thọ", "Quỳnh Trang", "Quỳnh Xá"],
            "Hưng Hà": ["Bắc Sơn", "Canh Tân", "Chí Hòa", "Chi Lăng", "Cộng Hòa", "Dân Chủ", "Điệp Nông", "Đoan Hùng", "Độc Lập", "Đông Đô", "Duyên Hải", "Hòa Bình", "Hòa Tiến", "Hồng An", "Hồng Lĩnh", "Hồng Minh", "Hùng Dũng", "Hưng Hà", "Hưng Nhân", "Kim Chung", "Liên Hiệp", "Minh Hòa", "Minh Khai", "Minh Tân", "Phúc Khánh", "Tân Hòa", "Tân Tiến", "Tây Đô", "Thái Hưng", "Thái Phương", "Thống Nhất", "Tiến Đức", "Văn Cẩm", "Văn Lang"],
            "Đông Hưng": ["An Châu", "Bạch Đằng", "Chương Dương", "Đô Lương", "Đông Á", "Đông Các", "Đông Cường", "Đông Động", "Đông Dương", "Đông Giang", "Đông Hà", "Đông Hoàng", "Đông Hợp", "Đông Hưng", "Đông Huy", "Đông Kinh", "Đông La", "Đông Lĩnh", "Đông Phong", "Đông Phương", "Đông Quang", "Đông Sơn", "Đông Tân", "Đông Vinh", "Đông Xuân", "Đông Xương", "Hoa Lư", "Hoa Nam", "Hồng Châu", "Hồng Giang", "Hồng Việt", "Hợp Tiến", "Liên Giang", "Lô Giang", "Mê Linh", "Minh Châu", "Minh Tân", "Nguyên Xá", "Phong Châu", "Phú Châu", "Phú Lương", "Thăng Long", "Trọng Quan", "Việt Hùng", "Vũ Đông", "Xuân Hòa", "Xuân Trường"],
            "Vũ Thư": ["Bách Thuận", "Đồng Thanh", "Dũng Nghĩa", "Duyên Hải", "Hồng Lý", "Hồng Phong", "Kim Chung", "Minh Lãng", "Minh Quang", "Nguyên Xá", "Phúc Thành", "Song An", "Song Lãng", "Tam Quang", "Tân Hòa", "Tân Lập", "Tân Phong", "Trung An", "Tự Tân", "Việt Hùng", "Việt Thuận", "Vũ Đoài", "Vũ Hội", "Vũ Tiến", "Vũ Vân", "Vũ Vinh", "Xuân Hòa"],
            "Nam Định": ["Bà Triệu", "Cửa Bắc", "Cửa Nam", "Hạ Long", "Lộc Hạ", "Lộc Hòa", "Lộc Vượng", "Năng Tĩnh", "Ngô Quyền", "Nguyễn Du", "Phan Đình Phùng", "Quang Trung", "Thống Nhất", "Trần Đăng Ninh", "Trần Hưng Đạo", "Trần Quang Khải", "Trường Thi", "Văn Miếu", "Vị Hoàng", "Vị Xuyên"],
            "Mỹ Lộc": ["Mỹ Hà", "Mỹ Hưng", "Mỹ Lộc", "Mỹ Phúc", "Mỹ Tân", "Mỹ Thắng", "Mỹ Thành", "Mỹ Thịnh", "Mỹ Thuận", "Mỹ Tiến", "Mỹ Trung", "Mỹ Xá"],
            "Vụ Bản": ["Cộng Hòa", "Đại An", "Đại Thắng", "Hiển Khánh", "Hợp Hưng", "Kim Thái", "Liên Bảo", "Liên Minh", "Minh Tân", "Minh Thuận", "Quang Trung", "Tam Thanh", "Tân Khánh", "Tân Thành", "Thành Lợi", "Vĩnh Hào"],
            "Ý Yên": ["Yên Bằng", "Yên Bình", "Yên Chính", "Yên Cường", "Yên Đồng", "Yên Hồng", "Yên Hưng", "Yên Khang", "Yên Khánh", "Yên Lộc", "Yên Lương", "Yên Minh", "Yên Mỹ", "Yên Nghĩa", "Yên Nhân", "Yên Ninh", "Yên Phong", "Yên Phú", "Yên Phương", "Yên Quang", "Yên Tân", "Yên Thắng", "Yên Thành", "Yên Thọ", "Yên Tiến", "Yên Trị", "Yên Trung", "Yên Xá"],
            "Nghĩa Hưng": ["Nghĩa An", "Nghĩa Bình", "Nghĩa Châu", "Nghĩa Đồng", "Nghĩa Hải", "Nghĩa Hồng", "Nghĩa Hùng", "Nghĩa Lạc", "Nghĩa Lâm", "Nghĩa Lợi", "Nghĩa Minh", "Nghĩa Phong", "Nghĩa Phú", "Nghĩa Sơn", "Nghĩa Tân", "Nghĩa Thái", "Nghĩa Thắng", "Nghĩa Thành", "Nghĩa Thịnh", "Nghĩa Trung", "Phúc Thắng", "Rạng Đông"]
        };

        this.init();
    }

    init() {
        // Kiểm tra giỏ hàng
        if (!cartManager || cartManager.cart.length === 0) {
            alert("Giỏ hàng trống! Vui lòng thêm sản phẩm vào giỏ hàng.");
            window.location.href = "index.html";
            return;
        }

        // Khởi tạo select box tỉnh/thành phố
        this.initCitySelect();

        // Render danh sách sản phẩm
        this.renderOrderItems();

        // Thêm sự kiện cho nút xác nhận đặt hàng
        document.getElementById("confirmOrder").addEventListener("click", () => this.handleOrderConfirmation());

        // Thêm sự kiện cho select box tỉnh/thành phố
        document.getElementById("city").addEventListener("change", (e) => this.handleCityChange(e.target.value));

        // Thêm sự kiện cho select box quận/huyện
        document.getElementById("district").addEventListener("change", (e) => this.handleDistrictChange(e.target.value));
    }

    initCitySelect() {
        const citySelect = document.getElementById("city");
        Object.entries(this.cities).forEach(([key, value]) => {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = value;
            citySelect.appendChild(option);
        });
    }

    renderOrderItems() {
        const orderItemsContainer = document.getElementById("orderItems");
        orderItemsContainer.innerHTML = "";

        const groupedItems = cartManager.groupItems();
        groupedItems.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "mb-3";
            div.innerHTML = `
                <div class="d-flex align-items-center">
                    <input type="checkbox" class="form-check-input me-2" id="item-${index}" 
                           ${this.selectedItems.has(item.title) ? "checked" : ""}>
                    <div class="flex-grow-1">
                        <h6 class="mb-0">${item.title}</h6>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="input-group" style="width: 120px;">
                                <button class="btn btn-outline-secondary btn-sm" type="button" 
                                        onclick="orderManager.updateQuantity(${index}, -1)">-</button>
                                <input type="number" class="form-control form-control-sm text-center" 
                                       value="${item.quantity}" min="1" max="99" 
                                       onchange="orderManager.updateQuantity(${index}, this.value)">
                                <button class="btn btn-outline-secondary btn-sm" type="button" 
                                        onclick="orderManager.updateQuantity(${index}, 1)">+</button>
                            </div>
                            <span class="text-success">${(item.price * item.quantity).toLocaleString()}₫</span>
                        </div>
                    </div>
                </div>
            `;
            orderItemsContainer.appendChild(div);

            // Thêm sự kiện cho checkbox
            const checkbox = div.querySelector(`#item-${index}`);
            checkbox.addEventListener("change", (e) => {
                if (e.target.checked) {
                    this.selectedItems.add(item.title);
                } else {
                    this.selectedItems.delete(item.title);
                }
                this.updateTotalAmount();
            });
        });

        this.updateTotalAmount();
    }

    updateQuantity(index, change) {
        const items = cartManager.groupItems();
        const item = items[index];
        
        if (typeof change === "number") {
            item.quantity = Math.max(1, Math.min(99, item.quantity + change));
        } else {
            item.quantity = Math.max(1, Math.min(99, parseInt(change) || 1));
        }

        // Cập nhật lại giỏ hàng
        cartManager.cart = [];
        items.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                cartManager.cart.push({
                    title: item.title,
                    price: item.price
                });
            }
        });

        cartManager.saveCart();
        this.renderOrderItems();
    }

    updateTotalAmount() {
        const items = cartManager.groupItems();
        const total = items.reduce((sum, item) => {
            if (this.selectedItems.has(item.title)) {
                return sum + (item.price * item.quantity);
            }
            return sum;
        }, 0);

        document.getElementById("totalAmount").textContent = `${total.toLocaleString()}₫`;
    }

    handleCityChange(cityKey) {
        const districtSelect = document.getElementById("district");
        const wardSelect = document.getElementById("ward");

        // Reset và cập nhật quận/huyện
        districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
        wardSelect.innerHTML = '<option value="">Chọn Xã/Phường</option>';

        if (cityKey && this.districts[cityKey]) {
            this.districts[cityKey].forEach(district => {
                const option = document.createElement("option");
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        }
    }

    handleDistrictChange(district) {
        const wardSelect = document.getElementById("ward");
        wardSelect.innerHTML = '<option value="">Chọn Xã/Phường</option>';

        if (district && this.wards[district]) {
            // Loại bỏ các xã/phường trùng lặp
            const uniqueWards = [...new Set(this.wards[district])];
            uniqueWards.forEach(ward => {
                const option = document.createElement("option");
                option.value = ward;
                option.textContent = ward;
                wardSelect.appendChild(option);
            });
        }
    }

    async handleOrderConfirmation() {
        // Kiểm tra form
        const form = document.getElementById("customerForm");
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Kiểm tra có sản phẩm nào được chọn không
        if (this.selectedItems.size === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm!");
            return;
        }

        // Thu thập thông tin đơn hàng
        const orderData = {
            customerInfo: {
                fullName: document.getElementById("fullName").value,
                phone: document.getElementById("phone").value,
                city: this.cities[document.getElementById("city").value],
                district: document.getElementById("district").value,
                ward: document.getElementById("ward").value,
                address: document.getElementById("address").value
            },
            items: cartManager.groupItems().filter(item => this.selectedItems.has(item.title)),
            totalAmount: parseInt(document.getElementById("totalAmount").textContent.replace(/[^\d]/g, ""))
        };

        try {
            // Gửi dữ liệu đến Google Sheets
            const response = await fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error("Lỗi khi gửi đơn hàng");
            }

            // Xóa giỏ hàng và chuyển hướng
            cartManager.cart = [];
            cartManager.saveCart();
            alert("Đặt hàng thành công! Cảm ơn bạn đã mua hàng tại Mimo Agri.");
            window.location.href = "index.html";
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
        }
    }
}

// Khởi tạo OrderManager khi DOM đã load
let orderManager;
window.addEventListener("load", function() {
    // Đợi thêm một chút để đảm bảo header/footer đã được load
    setTimeout(() => {
        orderManager = new OrderManager();
    }, 100);
}); 