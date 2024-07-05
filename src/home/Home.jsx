import Banner from "../components/Banner";
// import FavBook from "./FavBook";
// import FavoriteBooks from "./FavoriteBooks";
import PopularBooks from "./PopularBooks";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Banner />
      {/* <FavoriteBooks /> */}
      <div className="flex justify-center border-black">
        <div className="w-2/3"> 
          <PopularBooks/>
        </div>
      </div>
      {/* <FavBook /> */}
    </div>
  );
};

export default Home;

/**
 * 8/3:
 *  - them 2 nút ấn vào trong phần home.                                                               Ͳ
 *  - Giải quyết phần css cho bức ảnh để có thể căn chỉnh ra giữa.                                     Ͳ
 *  - Thêm các cuốn sách vào database                                                                  Ͳ
 *  - Tạo component cho nút button                                                                     Ͳ
 *  - Làm phần side bar để cho có cái active. (Tìm hiểu về uselocation pathname)                       Ͳ
 *  - khi xóa sẽ tự động cập nhật lại giao diện                                                        Ͳ
 *  - khi bấm vào nút ok ở cái alert trong phần upload thì sẽ tự động điều hướng sang bên manage books Ͳ
 *  - breadcrumb                                                                                       Ͳ
 *  - làm phần footer                                                                                  Ͳ
 *  - tạo log in log out                                                                               Ͳ
 *  - Ket nối đến đúng database trong mongoDB                                                          Ͳ
 *  - Xử lý lỗi ở phần chuyển trang trong nút log in                                                   Ͳ
 *  - Làm tính năng phân quyền                                                                         Ͳ
 *  - Lưu token vào local storage và đẩy ngược lại token cho phía client                               Ͳ
 *  - Làm chức năng search book                                                                        Ͳ
 *  - Xử lý phần bấm nút log in và log out mượt hơn.                                                   Ͳ
 *  - Mỗi khi mua hàng sẽ giảm quantity đi                                                             Ͳ
 *  - Thêm sửa xóa bên giỏ hàng xong thì lưu vào database                                              Ͳ
 *  - Sửa lại để cho các cuốn sách phổ biến sẽ hiển thị ở bên ngoài trang chủ                          Ͳ
 *  - Làm cho profile để có thể edit                                                                   Ͳ
 *  - Upload ảnh với form data                                                                         Ͳ
 *  - Sửa tiếp phần edit user                                                                          Ͳ
 *  - Logic khi mua hàng quantity                                                                      Ͳ
 *  - Cập nhật lại để khi bấm vào 1 cuốn sách thì sẽ gợi ý ra các cuốn sách                            Ͳ
 *  - Sửa để cho hệ thống dùng toastify                                                                Ͳ
 *  - Làm phần xóa 1 sản phẩm khỏi giỏ hàng                                                            Ͳ
 *  - Sửa để chọn role trong admin                                                                     Ͳ
 *  - Sửa để khi add to cart thì sẽ có thông báo đẹp hơn                                               Ͳ
 *  - Thay thế avatar default                                                                          Ͳ
 *  - Sửa để cho nút add to cart đẹp hơn                                                               Ͳ
 *  - Trạng thái  mua hàng của 1 sản phẩm                                                              Ͳ
 *  - User có thể xem được trạng thái của 1 đơn hàng cụ thể                                            Ͳ
 *  - Khi nhấn vào icon avatar mà bấm ra ngoài thì nó có thể tắt đi được                               Ͳ
 *  - Sửa lại tính năng quản lý đơn hàng                  
 *  - Bấm nút delete trong quản lý user thì phải hiện thông báo xác nhận                                                                         
 *  - Sửa để cho gửi email đẹp hơn
 *  - Phân trang cho quản lý user 
 *  - Sửa lại phần recommend là dùng dropdown 
 *  - Sửa lại ở phần trang chủ để khi search thì kết quả trả về ở dạng dropdown 
 *  - Sửa để fix cứng giá trị của VN trong phần thanh toán 
 *  - Thay icon sáng tối
 */