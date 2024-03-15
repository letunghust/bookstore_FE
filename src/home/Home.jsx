import Banner from '../components/Banner'
import FavBook from './FavBook'
import FavoriteBooks from './FavoriteBooks'


const Home = () => {
  return (
    <div>
     <Banner/>
     <FavoriteBooks/>
     <FavBook/>
    </div>
  )
}

export default Home

/**
 * 8/3: 
 *  - them 2 nút ấn vào trong phần home. 
 *  - tạo thêm component slider để cho cả 2 phần đều chuyển động được. 
 *  - Giải quyết phần css cho bức ảnh để có thể căn chỉnh ra giữa.
 *  - Thêm các cuốn sách vào database                                             
 *  - Tạo component cho nút button                                                                     Ͳ
 *  - Làm phần side bar để cho có cái active. (Tìm hiểu về uselocation pathname)                       Ͳ
 *  - khi xóa sẽ tự động cập nhật lại giao diện                                                        Ͳ
 *  - khi bấm vào nút ok ở cái alert trong phần upload thì sẽ tự động điều hướng sang bên manage books Ͳ
 *  - breadcrumb                                                                                       Ͳ
 *  - làm phần footer                                                                                  Ͳ
 *  - tạo log in log out                                                                               Ͳ
 *  - Làm chức năng search book 
 */