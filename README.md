# 🏨 TravelStay - Hệ Thống Đặt Phòng Khách Sạn

**TravelStay** là một ứng dụng web đặt phòng khách sạn hiện đại, được xây dựng bằng React và Material-UI, cung cấp trải nghiệm đặt phòng trực tuyến cho người dùng và hệ thống quản lý toàn diện cho quản trị viên.

## ✨ Tính Năng Chính

### 🎯 Cho Người Dùng
- **Trang chủ hấp dẫn** với hero section và form tìm kiếm nâng cao
- **Tìm kiếm khách sạn** theo điểm đến, ngày check-in/out, số khách
- **Danh sách khách sạn** với bộ lọc theo giá, đánh giá, tiện ích
- **Chi tiết khách sạn** với hình ảnh, đánh giá, tiện ích và loại phòng
- **Trang điểm đến phổ biến** cho các thành phố lớn (Đà Nẵng, Nha Trang, Phú Quốc, Hội An, Hà Nội, TP.HCM)
- **Hệ thống đăng nhập/đăng ký** với quản lý tài khoản cá nhân
- **Giao diện responsive** tối ưu cho mọi thiết bị

### 🔧 Cho Quản Trị Viên
- **Dashboard tổng quan** với thống kê và biểu đồ trực quan
- **Quản lý khách sạn** - thêm, sửa, xóa, tìm kiếm và phân trang
- **Quản lý đặt phòng** - xác nhận, hủy, lọc theo trạng thái
- **Quản lý người dùng** - phân quyền, thay đổi vai trò
- **Giao diện admin hiện đại** với sidebar có thể thu gọn và header tìm kiếm

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **React 19** - Thư viện UI hiện đại
- **TypeScript** - Type safety và developer experience
- **Material-UI (MUI) v7** - Component library đẹp và responsive
- **React Router DOM v7** - Routing và navigation
- **Vite** - Build tool nhanh và hiệu quả

### Styling & UI
- **Emotion** - CSS-in-JS styling
- **Material Design Icons** - Icon set đầy đủ
- **Responsive Design** - Tối ưu cho mobile và desktop
- **Gradient Backgrounds** - Giao diện hiện đại và hấp dẫn

### Development Tools
- **ESLint** - Code quality và consistency
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Dev Server** - Hot reload và development experience

## 📁 Cấu Trúc Dự Án

```
sleep_well/
├── src/
│   ├── components/          # Components tái sử dụng
│   │   ├── Header.tsx      # Header chính với navigation
│   │   ├── Footer.tsx      # Footer trang
│   │   └── ScrollToTop.tsx # Scroll to top component
│   ├── layout/             # Layout components
│   │   ├── LayoutRoot.tsx  # Layout chính cho user pages
│   │   └── AdminLayout.tsx # Layout cho admin panel
│   ├── pages/              # Các trang chính
│   │   ├── Home.tsx        # Trang chủ
│   │   ├── Hotels.tsx      # Danh sách khách sạn
│   │   ├── HotelDetail.tsx # Chi tiết khách sạn
│   │   ├── Destination.tsx # Trang điểm đến phổ biến
│   │   ├── Contact.tsx     # Trang liên hệ
│   │   ├── Login.tsx       # Đăng nhập
│   │   ├── Register.tsx    # Đăng ký
│   │   ├── Profile.tsx     # Hồ sơ người dùng
│   │   └── admin/          # Admin pages
│   │       ├── AdminDashboard.tsx # Dashboard tổng quan
│   │       ├── AdminHotels.tsx    # Quản lý khách sạn
│   │       ├── AdminBookings.tsx  # Quản lý đặt phòng
│   │       ├── AdminUsers.tsx     # Quản lý người dùng
│   │       └── AdminLogin.tsx     # Đăng nhập admin (đã loại bỏ)
│   ├── data/               # Data và models
│   │   └── hotels.ts       # Dữ liệu khách sạn và interfaces
│   ├── assets/             # Static assets
│   ├── App.tsx             # Component chính và routing
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Public assets
├── package.json            # Dependencies và scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Documentation này
```

## 🚀 Cài Đặt Và Chạy

### Yêu Cầu Hệ Thống
- **Node.js** phiên bản 18.0.0 trở lên
- **npm** hoặc **yarn** package manager

### Cài Đặt Dependencies
```bash
# Clone repository
git clone <repository-url>
cd sleep_well

# Cài đặt dependencies
npm install
# hoặc
yarn install
```

### Chạy Development Server
```bash
# Chạy development server
npm run dev
# hoặc
yarn dev

# Mở trình duyệt tại http://localhost:5173
```

### Build Production
```bash
# Build cho production
npm run build
# hoặc
yarn build

# Preview build
npm run preview
# hoặc
yarn preview
```

### Linting
```bash
# Chạy ESLint
npm run lint
# hoặc
yarn lint
```

## 🎨 Giao Diện Và UX

### Design System
- **Material Design 3** principles
- **Color Palette** theo theme MUI với primary color xanh dương
- **Typography** hierarchy rõ ràng với font weights khác nhau
- **Spacing** system nhất quán (8px grid system)
- **Shadows** và **Elevation** cho depth

### Responsive Design
- **Mobile First** approach
- **Breakpoints**: xs (0px), sm (600px), md (900px), lg (1200px), xl (1536px)
- **Mobile Sidebar** với navigation drawer
- **Desktop Navigation** với horizontal menu

### Interactive Elements
- **Hover Effects** với transitions mượt mà
- **Loading States** và **Skeleton** components
- **Form Validation** với error messages
- **Toast Notifications** cho user feedback

## 📊 Dữ Liệu Và Models

### Hotel Interface
```typescript
interface Hotel {
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
```

### Room Type Interface
```typescript
interface RoomType {
  id: number;
  name: string;
  price: number;
  capacity: number;
  description: string;
}
```

### Dữ Liệu Mẫu
- **22 khách sạn** tại các thành phố lớn Việt Nam
- **Mỗi khách sạn** có 3 loại phòng khác nhau
- **4 hình ảnh** cho mỗi khách sạn
- **Tiện ích đa dạng**: WiFi, Hồ bơi, Nhà hàng, Spa, Gym, Bãi đỗ xe

## 🔐 Authentication & Authorization

### User Authentication
- **Local Storage** based authentication (mock implementation)
- **Login/Register** forms với validation
- **User Profile** management
- **Session Persistence** across page reloads

### Admin Access
- **Public Admin Panel** - không cần đăng nhập
- **Role-based Access** (admin/user) trong data model
- **Protected Routes** structure (có thể implement sau)

## 🎯 Tính Năng Nổi Bật

### Search & Filtering
- **Advanced Search** với multiple criteria
- **Real-time Filtering** theo giá, rating, amenities
- **Location-based Search** với city mapping
- **Quick Destinations** cho các thành phố phổ biến

### Admin Management
- **Table-based Views** với pagination
- **CRUD Operations** cho hotels, bookings, users
- **Status Management** cho bookings (pending, confirmed, cancelled)
- **Data Export** capabilities (có thể implement sau)

### Performance Optimizations
- **React.memo** và **useMemo** cho expensive calculations
- **Lazy Loading** cho images
- **Code Splitting** với React Router
- **Optimized Re-renders** với proper state management

## 🔧 Customization

### Theme Configuration
```typescript
// Có thể customize theme trong src/theme.ts
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      dark: '#1565c0',
    },
    // ... other customizations
  },
});
```

### Adding New Features
1. **New Pages**: Thêm route trong `App.tsx`
2. **New Components**: Tạo trong `src/components/`
3. **New Data Models**: Extend interfaces trong `src/data/`
4. **Admin Features**: Thêm vào `src/pages/admin/`

## 🚧 Roadmap & Future Features

### Phase 1 (Current)
- ✅ User authentication system
- ✅ Hotel search and booking
- ✅ Admin panel with CRUD operations
- ✅ Responsive design
- ✅ Popular destinations pages

### Phase 2 (Planned)
- 🔄 Real backend integration
- 🔄 Payment gateway integration
- 🔄 Email notifications
- 🔄 Advanced analytics dashboard
- 🔄 Multi-language support

### Phase 3 (Future)
- 📅 Mobile app (React Native)
- 📅 Real-time chat support
- 📅 AI-powered recommendations
- 📅 Virtual tour integration
- 📅 Social media integration

## 🤝 Contributing

### Development Workflow
1. **Fork** repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

### Code Standards
- **TypeScript** strict mode
- **ESLint** rules compliance
- **Component** naming conventions
- **File** structure consistency
- **Comment** documentation

## 📝 License

Dự án này được phát triển cho mục đích học tập và demo. Bạn có thể sử dụng code này cho các dự án cá nhân hoặc thương mại.

## 📞 Support & Contact

- **Developer**: [Nguyễn Xuân TràTrà]
- **Email**: [nguyenxuantra2k3@gmail.com]


---

**TravelStay** - Nơi mọi chuyến đi đều hoàn hảo! 🚀✨
