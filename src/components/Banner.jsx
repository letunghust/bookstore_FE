
const Banner = () => {
  return (
    <div className="flex justify-center items-center p-8 bg-gray-200">
      {/* left side bar */}
      <div className="text-lg font-semibold text-blue-500"> 
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-4">Search books</h2>
          <div className="flex items-center">
            <input
              className="border border-gray-300 px-4 py-2 rounded-l-full focus:outline-none"
              type="search"
              name="search"
              id="search"
              placeholder="Search a book"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-full">
              Search
            </button>
          </div>
        </div>
      </div>
      {/* right side bar */}
      {/* <div className="text-lg font-semibold text-red-500">Right Side</div> */}
    </div>
  );
};

export default Banner;
