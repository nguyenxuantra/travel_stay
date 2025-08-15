export interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  images: string[];
  amenities: string[];
  discount: string;
  reviews: number;
  description: string;
  longDescription?: string;
  roomTypes: RoomType[];
}

export interface RoomType {
  id: number;
  name: string;
  price: number;
  capacity: number;
  description: string;
}

const img = (id: string, w = 800, h = 500) => `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop`;

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Grand Hotel Saigon",
    location: "Quận 1, TP.HCM",
    rating: 4.8,
    price: 2500000,
    image: img("photo-1566073771259-6a8506099945", 400, 300),
    images: [
      img("photo-1566073771259-6a8506099945"),
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1520250497591-112f2f40a3f4"),
      img("photo-1551882547-ff40c63fe5fa")
    ],
    amenities: ["wifi", "pool", "restaurant"],
    discount: "20%",
    reviews: 1247,
    description: "Khách sạn 5 sao sang trọng tại trung tâm TP.HCM",
    longDescription: `Grand Hotel Saigon được xây dựng với kiến trúc Pháp cổ điển kết hợp với nét hiện đại...`,
    roomTypes: [
      { id: 1, name: "Phòng Deluxe", price: 2500000, capacity: 2, description: "Phòng 35m² với view thành phố, ban công riêng" },
      { id: 2, name: "Phòng Executive", price: 3500000, capacity: 2, description: "Phòng 45m² với lounge access và dịch vụ ưu tiên" },
      { id: 3, name: "Suite Tổng thống", price: 8000000, capacity: 4, description: "Suite 120m² với 2 phòng ngủ và view toàn cảnh" }
    ]
  },
  {
    id: 2,
    name: "Mariott Resort Nha Trang",
    location: "Nha Trang, Khánh Hòa",
    rating: 4.9,
    price: 3200000,
    image: img("photo-1571896349842-33c89424de2d", 400, 300),
    images: [
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1566073771259-6a8506099945"),
      img("photo-1520250497591-112f2f40a3f4"),
      img("photo-1542314831-068cd1dbfeeb")
    ],
    amenities: ["wifi", "pool", "spa"],
    discount: "15%",
    reviews: 892,
    description: "Resort biển đẳng cấp với view biển tuyệt đẹp",
    roomTypes: [
      { id: 1, name: "Phòng Garden", price: 2800000, capacity: 2, description: "View vườn, 32m²" },
      { id: 2, name: "Phòng Ocean", price: 3600000, capacity: 2, description: "View biển, 38m²" },
      { id: 3, name: "Villa Bãi biển", price: 7200000, capacity: 4, description: "Villa sát biển, hồ bơi riêng" }
    ]
  },
  {
    id: 3,
    name: "InterContinental Danang",
    location: "Đà Nẵng",
    rating: 4.7,
    price: 4500000,
    image: img("photo-1520250497591-112f2f40a3f4", 400, 300),
    images: [
      img("photo-1520250497591-112f2f40a3f4"),
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1551882547-ff40c63fe5fa"),
      img("photo-1542314831-068cd1dbfeeb")
    ],
    amenities: ["wifi", "pool", "restaurant", "spa"],
    discount: "25%",
    reviews: 1563,
    description: "Khách sạn quốc tế với dịch vụ cao cấp",
    roomTypes: [
      { id: 1, name: "Classic Room", price: 4200000, capacity: 2, description: "Phòng 30m², view vườn" },
      { id: 2, name: "Premium Sea", price: 5200000, capacity: 2, description: "View biển, ban công" },
      { id: 3, name: "Suite Biển", price: 9000000, capacity: 4, description: "Suite 100m², view biển" }
    ]
  },
  {
    id: 4,
    name: "Sheraton Hanoi",
    location: "Hà Nội",
    rating: 4.6,
    price: 2800000,
    image: img("photo-1551882547-ff40c63fe5fa", 400, 300),
    images: [
      img("photo-1551882547-ff40c63fe5fa"),
      img("photo-1566073771259-6a8506099945"),
      img("photo-1542314831-068cd1dbfeeb"),
      img("photo-1571896349842-33c89424de2d")
    ],
    amenities: ["wifi", "restaurant"],
    discount: "10%",
    reviews: 734,
    description: "Khách sạn 4 sao tại trung tâm Hà Nội",
    roomTypes: [
      { id: 1, name: "Deluxe", price: 2600000, capacity: 2, description: "30m², city view" },
      { id: 2, name: "Club", price: 3200000, capacity: 2, description: "Quyền lợi Club Lounge" },
      { id: 3, name: "Suite", price: 6000000, capacity: 3, description: "70m², phòng khách riêng" }
    ]
  },
  {
    id: 5,
    name: "Fusion Resort Phu Quoc",
    location: "Phú Quốc",
    rating: 4.9,
    price: 3800000,
    image: img("photo-1571003123894-1f0594d2b5d9", 400, 300),
    images: [
      img("photo-1571003123894-1f0594d2b5d9"),
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1520250497591-112f2f40a3f4"),
      img("photo-1566073771259-6a8506099945")
    ],
    amenities: ["wifi", "pool", "spa", "restaurant"],
    discount: "30%",
    reviews: 445,
    description: "Resort đảo ngọc với không gian yên tĩnh",
    roomTypes: [
      { id: 1, name: "Garden Villa", price: 3600000, capacity: 2, description: "Villa vườn, bồn tắm ngoài trời" },
      { id: 2, name: "Pool Villa", price: 5200000, capacity: 2, description: "Villa hồ bơi riêng" },
      { id: 3, name: "Beachfront Villa", price: 8200000, capacity: 4, description: "Villa sát biển, 1 phòng khách" }
    ]
  },
  {
    id: 6,
    name: "Amanoi Resort",
    location: "Ninh Thuận",
    rating: 4.8,
    price: 8500000,
    image: img("photo-1582719478250-c89cae4dc85b", 400, 300),
    images: [
      img("photo-1582719478250-c89cae4dc85b"),
      img("photo-1551882547-ff40c63fe5fa"),
      img("photo-1542314831-068cd1dbfeeb"),
      img("photo-1520250497591-112f2f40a3f4")
    ],
    amenities: ["wifi", "pool", "spa", "restaurant"],
    discount: "0%",
    reviews: 234,
    description: "Resort siêu cao cấp với view núi biển",
    roomTypes: [
      { id: 1, name: "Pavilion", price: 7800000, capacity: 2, description: "Pavilion view vườn" },
      { id: 2, name: "Ocean Pavilion", price: 9800000, capacity: 2, description: "View biển" },
      { id: 3, name: "Pool Villa", price: 15000000, capacity: 4, description: "Villa hồ bơi riêng" }
    ]
  },
  {
    id: 7,
    name: "Park Hyatt Saigon",
    location: "Quận 1, TP.HCM",
    rating: 4.9,
    price: 5200000,
    image: img("photo-1542314831-068cd1dbfeeb", 400, 300),
    images: [
      img("photo-1542314831-068cd1dbfeeb"),
      img("photo-1566073771259-6a8506099945"),
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1551882547-ff40c63fe5fa")
    ],
    amenities: ["wifi", "pool", "spa", "restaurant", "gym"],
    discount: "15%",
    reviews: 567,
    description: "Khách sạn 5 sao sang trọng với kiến trúc Pháp cổ điển",
    roomTypes: [
      { id: 1, name: "Park Room", price: 4800000, capacity: 2, description: "35m², sang trọng" },
      { id: 2, name: "Park Deluxe", price: 5600000, capacity: 2, description: "40m², city view" },
      { id: 3, name: "Suite", price: 9500000, capacity: 3, description: "Suite 85m²" }
    ]
  },
  {
    id: 8,
    name: "Six Senses Ninh Van Bay",
    location: "Nha Trang, Khánh Hòa",
    rating: 4.9,
    price: 12000000,
    image: img("photo-1571896349842-33c89424de2d", 400, 300),
    images: [
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1571003123894-1f0594d2b5d9"),
      img("photo-1520250497591-112f2f40a3f4"),
      img("photo-1566073771259-6a8506099945")
    ],
    amenities: ["wifi", "pool", "spa", "restaurant", "gym", "parking"],
    discount: "20%",
    reviews: 189,
    description: "Resort biệt lập với view vịnh Ninh Vân tuyệt đẹp",
    roomTypes: [
      { id: 1, name: "Hilltop Villa", price: 10500000, capacity: 2, description: "View đồi" },
      { id: 2, name: "Beachfront Villa", price: 13500000, capacity: 2, description: "Sát biển" },
      { id: 3, name: "Rock Pool Villa", price: 18000000, capacity: 4, description: "Hồ bơi riêng, trên đá" }
    ]
  },
  {
    id: 9,
    name: "Banyan Tree Lang Co",
    location: "Thừa Thiên Huế",
    rating: 4.8,
    price: 6800000,
    image: img("photo-1520250497591-112f2f40a3f4", 400, 300),
    images: [
      img("photo-1520250497591-112f2f40a3f4"),
      img("photo-1551882547-ff40c63fe5fa"),
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1542314831-068cd1dbfeeb")
    ],
    amenities: ["wifi", "pool", "spa", "restaurant", "gym"],
    discount: "25%",
    reviews: 312,
    description: "Resort cao cấp với view biển và núi tuyệt đẹp",
    roomTypes: [
      { id: 1, name: "Lagoon Villa", price: 6400000, capacity: 2, description: "View đầm phá" },
      { id: 2, name: "Beach Villa", price: 7800000, capacity: 2, description: "Gần biển" },
      { id: 3, name: "Double Pool Villa", price: 12500000, capacity: 4, description: "2 hồ bơi" }
    ]
  },
  {
    id: 10,
    name: "Four Seasons Resort The Nam Hai",
    location: "Hội An, Quảng Nam",
    rating: 4.9,
    price: 9500000,
    image: img("photo-1551882547-ff40c63fe5fa", 400, 300),
    images: [
      img("photo-1551882547-ff40c63fe5fa"),
      img("photo-1566073771259-6a8506099945"),
      img("photo-1520250497591-112f2f40a3f4"),
      img("photo-1571896349842-33c89424de2d")
    ],
    amenities: ["wifi", "pool", "spa", "restaurant", "gym", "parking"],
    discount: "10%",
    reviews: 278,
    description: "Resort 5 sao với thiết kế độc đáo và dịch vụ đẳng cấp",
    roomTypes: [
      { id: 1, name: "Villa 1 phòng ngủ", price: 9000000, capacity: 2, description: "Villa vườn" },
      { id: 2, name: "Villa 2 phòng ngủ", price: 15000000, capacity: 4, description: "Villa rộng rãi" },
      { id: 3, name: "Beachfront Villa", price: 22000000, capacity: 4, description: "Villa sát biển" }
    ]
  },
  // Thêm khách sạn cho TP.HCM
  {
    id: 11,
    name: "Renaissance Riverside Hotel Saigon",
    location: "Quận 1, TP.HCM",
    rating: 4.5,
    price: 1800000,
    image: img("photo-1566073771259-6a8506099945", 400, 300),
    images: [
      img("photo-1566073771259-6a8506099945"),
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1520250497591-112f2f40a3f4"),
      img("photo-1551882547-ff40c63fe5fa")
    ],
    amenities: ["wifi", "pool", "restaurant"],
    discount: "25%",
    reviews: 456,
    description: "Khách sạn 4 sao view sông Sài Gòn",
    roomTypes: [
      { id: 1, name: "Deluxe River", price: 1800000, capacity: 2, description: "View sông, 35m²" },
      { id: 2, name: "Executive Suite", price: 2800000, capacity: 2, description: "Suite cao cấp, 50m²" },
      { id: 3, name: "Presidential Suite", price: 5500000, capacity: 4, description: "Suite tổng thống, 120m²" }
    ]
  },
  {
    id: 12,
    name: "Caravelle Saigon",
    location: "Quận 1, TP.HCM",
    rating: 4.6,
    price: 2200000,
    image: img("photo-1542314831-068cd1dbfeeb", 400, 300),
    images: [
      img("photo-1542314831-068cd1dbfeeb"),
      img("photo-1582719478250-c89cae4dc85b"),
      img("photo-1571003123894-1f0594d2b5d9"),
      img("photo-1566073771259-6a8506099945")
    ],
    amenities: ["wifi", "restaurant", "gym"],
    discount: "15%",
    reviews: 389,
    description: "Khách sạn lịch sử tại trung tâm",
    roomTypes: [
      { id: 1, name: "Classic Room", price: 2200000, capacity: 2, description: "Phòng cổ điển, 30m²" },
      { id: 2, name: "Deluxe City", price: 2800000, capacity: 2, description: "View thành phố, 35m²" },
      { id: 3, name: "Heritage Suite", price: 4500000, capacity: 3, description: "Suite lịch sử, 70m²" }
    ]
  },
  // Thêm khách sạn cho Đà Nẵng
  {
    id: 13,
    name: "Novotel Danang Premier Han River",
    location: "Đà Nẵng",
    rating: 4.4,
    price: 2800000,
    image: img("photo-1520250497591-112f2f40a3f4", 400, 300),
    images: [
      img("photo-1520250497591-112f2f40a3f4"),
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1551882547-ff40c63fe5fa"),
      img("photo-1542314831-068cd1dbfeeb")
    ],
    amenities: ["wifi", "pool", "restaurant"],
    discount: "20%",
    reviews: 234,
    description: "Khách sạn 4 sao view sông Hàn",
    roomTypes: [
      { id: 1, name: "Deluxe River", price: 2800000, capacity: 2, description: "View sông, 32m²" },
      { id: 2, name: "Premium City", price: 3500000, capacity: 2, description: "View thành phố, 38m²" },
      { id: 3, name: "Executive Suite", price: 5800000, capacity: 3, description: "Suite cao cấp, 65m²" }
    ]
  },
  {
    id: 14,
    name: "Hyatt Regency Danang",
    location: "Đà Nẵng",
    rating: 4.6,
    price: 3800000,
    image: img("photo-1582719478250-c89cae4dc85b", 400, 300),
    images: [
      img("photo-1582719478250-c89cae4dc85b"),
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1520250497591-112f2f40a3f4"),
      img("photo-1551882547-ff40c63fe5fa")
    ],
    amenities: ["wifi", "pool", "spa", "restaurant"],
    discount: "10%",
    reviews: 567,
    description: "Resort biển 5 sao tại Đà Nẵng",
    roomTypes: [
      { id: 1, name: "Ocean View", price: 3800000, capacity: 2, description: "View biển, 40m²" },
      { id: 2, name: "Garden Villa", price: 4800000, capacity: 2, description: "Villa vườn, 55m²" },
      { id: 3, name: "Beachfront Suite", price: 7500000, capacity: 4, description: "Suite sát biển, 90m²" }
    ]
  },
  // Thêm khách sạn cho Nha Trang
  {
    id: 15,
    name: "Vinpearl Resort Nha Trang",
    location: "Nha Trang, Khánh Hòa",
    rating: 4.3,
    price: 2500000,
    image: img("photo-1571896349842-33c89424de2d", 400, 300),
    images: [
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1571003123894-1f0594d2b5d9"),
      img("photo-1520250497591-112f2f40a3f4"),
      img("photo-1551882547-ff40c63fe5fa")
    ],
    amenities: ["wifi", "pool", "restaurant"],
    discount: "30%",
    reviews: 1234,
    description: "Resort biển với nhiều tiện ích",
    roomTypes: [
      { id: 1, name: "Garden Room", price: 2500000, capacity: 2, description: "View vườn, 35m²" },
      { id: 2, name: "Ocean Deluxe", price: 3200000, capacity: 2, description: "View biển, 40m²" },
      { id: 3, name: "Family Suite", price: 4800000, capacity: 4, description: "Suite gia đình, 75m²" }
    ]
  },
  {
    id: 16,
    name: "Amiana Resort Nha Trang",
    location: "Nha Trang, Khánh Hòa",
    rating: 4.5,
    price: 3200000,
    image: img("photo-1571003123894-1f0594d2b5d9", 400, 300),
    images: [
      img("photo-1571003123894-1f0594d2b5d9"),
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1520250497591-112f2f40a3f4"),
      img("photo-1551882547-ff40c63fe5fa")
    ],
    amenities: ["wifi", "pool", "spa", "restaurant"],
    discount: "20%",
    reviews: 456,
    description: "Resort biển yên tĩnh, view đẹp",
    roomTypes: [
      { id: 1, name: "Beachfront Villa", price: 3200000, capacity: 2, description: "Sát biển, 45m²" },
      { id: 2, name: "Garden Villa", price: 3800000, capacity: 2, description: "Villa vườn, 50m²" },
      { id: 3, name: "Ocean Suite", price: 5800000, capacity: 3, description: "Suite biển, 80m²" }
    ]
  },
  // Thêm khách sạn cho Phú Quốc
  {
    id: 17,
    name: "Salinda Resort Phu Quoc",
    location: "Phú Quốc",
    rating: 4.4,
    price: 2800000,
    image: img("photo-1582719478250-c89cae4dc85b", 400, 300),
    images: [
      img("photo-1582719478250-c89cae4dc85b"),
      img("photo-1571003123894-1f0594d2b5d9"),
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1520250497591-112f2f40a3f4")
    ],
    amenities: ["wifi", "pool", "restaurant"],
    discount: "25%",
    reviews: 345,
    description: "Resort biển với không gian xanh",
    roomTypes: [
      { id: 1, name: "Garden Bungalow", price: 2800000, capacity: 2, description: "Bungalow vườn, 40m²" },
      { id: 2, name: "Beachfront Villa", price: 3800000, capacity: 2, description: "Villa sát biển, 55m²" },
      { id: 3, name: "Ocean Suite", price: 5200000, capacity: 3, description: "Suite biển, 70m²" }
    ]
  },
  {
    id: 18,
    name: "Mango Bay Resort Phu Quoc",
    location: "Phú Quốc",
    rating: 4.2,
    price: 2200000,
    image: img("photo-1551882547-ff40c63fe5fa", 400, 300),
    images: [
      img("photo-1551882547-ff40c63fe5fa"),
      img("photo-1571003123894-1f0594d2b5d9"),
      img("photo-1582719478250-c89cae4dc85b"),
      img("photo-1571896349842-33c89424de2d")
    ],
    amenities: ["wifi", "restaurant"],
    discount: "35%",
    reviews: 234,
    description: "Resort sinh thái, gần gũi thiên nhiên",
    roomTypes: [
      { id: 1, name: "Eco Bungalow", price: 2200000, capacity: 2, description: "Bungalow sinh thái, 30m²" },
      { id: 2, name: "Garden Villa", price: 2800000, capacity: 2, description: "Villa vườn, 40m²" },
      { id: 3, name: "Beach House", price: 4200000, capacity: 4, description: "Nhà biển, 60m²" }
    ]
  },
  // Thêm khách sạn cho Hội An
  {
    id: 19,
    name: "Anantara Hoi An Resort",
    location: "Hội An, Quảng Nam",
    rating: 4.7,
    price: 4200000,
    image: img("photo-1542314831-068cd1dbfeeb", 400, 300),
    images: [
      img("photo-1542314831-068cd1dbfeeb"),
      img("photo-1551882547-ff40c63fe5fa"),
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1520250497591-112f2f40a3f4")
    ],
    amenities: ["wifi", "pool", "spa", "restaurant"],
    discount: "15%",
    reviews: 678,
    description: "Resort 5 sao tại phố cổ Hội An",
    roomTypes: [
      { id: 1, name: "Garden Villa", price: 4200000, capacity: 2, description: "Villa vườn, 50m²" },
      { id: 2, name: "River Suite", price: 5800000, capacity: 2, description: "Suite sông, 65m²" },
      { id: 3, name: "Heritage Villa", price: 7800000, capacity: 4, description: "Villa di sản, 100m²" }
    ]
  },
  {
    id: 20,
    name: "Palm Garden Beach Resort Hoi An",
    location: "Hội An, Quảng Nam",
    rating: 4.3,
    price: 2800000,
    image: img("photo-1571896349842-33c89424de2d", 400, 300),
    images: [
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1542314831-068cd1dbfeeb"),
      img("photo-1551882547-ff40c63fe5fa"),
      img("photo-1582719478250-c89cae4dc85b")
    ],
    amenities: ["wifi", "pool", "restaurant"],
    discount: "20%",
    reviews: 456,
    description: "Resort biển tại Hội An",
    roomTypes: [
      { id: 1, name: "Beachfront Room", price: 2800000, capacity: 2, description: "Sát biển, 35m²" },
      { id: 2, name: "Garden Deluxe", price: 3500000, capacity: 2, description: "Deluxe vườn, 42m²" },
      { id: 3, name: "Family Villa", price: 5200000, capacity: 4, description: "Villa gia đình, 80m²" }
    ]
  },
  // Thêm khách sạn cho Hà Nội
  {
    id: 21,
    name: "Sofitel Legend Metropole Hanoi",
    location: "Hà Nội",
    rating: 4.8,
    price: 4500000,
    image: img("photo-1551882547-ff40c63fe5fa", 400, 300),
    images: [
      img("photo-1551882547-ff40c63fe5fa"),
      img("photo-1542314831-068cd1dbfeeb"),
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1520250497591-112f2f40a3f4")
    ],
    amenities: ["wifi", "pool", "spa", "restaurant", "gym"],
    discount: "10%",
    reviews: 789,
    description: "Khách sạn 5 sao lịch sử tại Hà Nội",
    roomTypes: [
      { id: 1, name: "Historic Room", price: 4500000, capacity: 2, description: "Phòng lịch sử, 40m²" },
      { id: 2, name: "Metropole Suite", price: 6800000, capacity: 2, description: "Suite Metropole, 60m²" },
      { id: 3, name: "Presidential Suite", price: 12000000, capacity: 4, description: "Suite tổng thống, 150m²" }
    ]
  },
  {
    id: 22,
    name: "Hilton Hanoi Opera",
    location: "Hà Nội",
    rating: 4.5,
    price: 3200000,
    image: img("photo-1542314831-068cd1dbfeeb", 400, 300),
    images: [
      img("photo-1542314831-068cd1dbfeeb"),
      img("photo-1551882547-ff40c63fe5fa"),
      img("photo-1571896349842-33c89424de2d"),
      img("photo-1582719478250-c89cae4dc85b")
    ],
    amenities: ["wifi", "pool", "restaurant", "gym"],
    discount: "20%",
    reviews: 567,
    description: "Khách sạn 5 sao tại trung tâm Hà Nội",
    roomTypes: [
      { id: 1, name: "Deluxe Opera", price: 3200000, capacity: 2, description: "View nhà hát, 38m²" },
      { id: 2, name: "Executive Room", price: 4200000, capacity: 2, description: "Phòng Executive, 45m²" },
      { id: 3, name: "Opera Suite", price: 6800000, capacity: 3, description: "Suite Opera, 85m²" }
    ]
  }
];

export const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "wifi": return "wifi";
    case "pool": return "pool";
    case "restaurant": return "restaurant";
    case "spa": return "spa";
    case "gym": return "fitness_center";
    case "parking": return "local_parking";
    default: return "hotel";
  }
};

export const getAmenityLabel = (amenity: string) => {
  switch (amenity) {
    case "wifi": return "WiFi";
    case "pool": return "Hồ bơi";
    case "restaurant": return "Nhà hàng";
    case "spa": return "Spa";
    case "gym": return "Phòng gym";
    case "parking": return "Bãi đỗ xe";
    default: return amenity;
  }
};

export const getAmenityLabelFull = (amenity: string) => {
  switch (amenity) {
    case "wifi": return "WiFi miễn phí";
    case "pool": return "Hồ bơi";
    case "restaurant": return "Nhà hàng";
    case "spa": return "Spa & Massage";
    case "gym": return "Phòng gym";
    case "parking": return "Bãi đỗ xe";
    default: return amenity;
  }
};
