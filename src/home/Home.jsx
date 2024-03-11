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
 *  - Tạo component cho nút button 
 *  - Thêm các cuốn sách vào database 
 */