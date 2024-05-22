import Banner from "../components/Banner";
import FavBook from "./FavBook";
import FavoriteBooks from "./FavoriteBooks";

const Home = () => {
  return (
    <div>
      <Banner />
      <FavoriteBooks />
      <FavBook />
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
 *  - Thêm sửa xóa bên giỏ hàng xong thì lưu vào database
 *  - Sửa lại để cho các cuốn sách phổ biến sẽ hiển thị ở bên ngoài trang chủ
 *  - Làm cho profile để có thể edit                                                                   Ͳ
 *  - Upload ảnh với form data
 *  - Sửa tiếp phần edit user
 */




//12332132132