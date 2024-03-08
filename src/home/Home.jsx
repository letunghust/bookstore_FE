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
 *  - them 2 nút ấn vào trong phần home
 *  - tạo thêm component slider để cho cả 2 phần đều chuyển động được
 *   
 * 
 */