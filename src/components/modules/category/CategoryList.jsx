import Constants from "@/Constants";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-js-pagination';
import axiosInstance from "@/services/axiosService.js";
import { BreadCrumb, CardHeader, CategoryPhotoModal } from "@/components";

const CategoryList = () => {
  
// All Searching Variables start
  const [input, setInput] = useState({
    order_by : 'serial',
    per_page : 10,
    direction: 'asc',
    search   : '',
  });
// All Searching Variables end

//paginations data
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount]     = useState(1);
  const [startForm, setStartForm]                 = useState(1);
  const [activePage, setActivePage]               = useState(1);
//paginations data

//Modla photo showign start
  const [modalShow, setModalShow]   = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');
//Modla photo showign end
  const [categories, setCategories] = useState([]);

 // Category All data get by apis start 
  const getCategoryList = async (pageNumber = 1) => {
    try {
      const response = await axiosInstance.get(`${Constants.BASE_URL}/categories?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`);      
      if (response?.status == 200) {
        setCategories(response.data.data);
        setItemsCountPerPage(response.data.meta.per_page);
        setStartForm(response.data.meta.from);
        setTotalItemsCount(response.data.meta.total);
        setActivePage(response.data.meta.current_page);
      } else {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };
// Category All data get by apis end 

//Modla photo showign start
    const handlePhotoModal = (photo) => {
      setModalPhoto(photo);
      setModalShow(true)
    }
//Modla photo showign end

// searching part start
  const handleSearch = (e) => {
    setInput((prevState) => ({...prevState,[e.target.name]: e.target.value}));
  };
// searching part end

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <>
      <BreadCrumb title={"Category List"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <CardHeader
              title="Category List"
              location="/category/create"
              buttonText="Add"
              buttonIcon="fa-solid fa-bars me-2 text-light"
            />
            <div className="card-body">

            <div className="search-area mb-4">
               <div className="row">
                  <div className="col-md-3">
                    <label className="w-100">
                      <span>Search</span>
                      <input
                          className="form-control form-control-sm my-2"
                          type={'search'}
                          name={'search'}
                          value={input.search}
                          onChange={handleSearch}
                          placeholder="Searching ...."
                        />
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label className="w-100">
                      <span>Order By</span>
                      <select
                          className="form-select form-select-sm my-2"
                          name={'order_by'}
                          value={input.order_by}
                          onChange={handleSearch}
                        >
                          <option value={"name"}>Name</option>
                          <option value={"slug"}>Created At</option>
                          <option value={"created_at"}>Updated At</option>
                          <option value={"status"}>Status</option>
                          <option value={"serial"}>Serial</option>
                        </select>

                    </label>
                  </div>
                  <div className="col-md-2">
                    <label className="w-100">
                      <span>Order Direction</span>
                      <select
                          className="form-select form-select-sm my-2"
                          name={'direction'}
                          value={input.direction}
                          onChange={handleSearch}
                        >
                          <option value={"asc"}>Asc</option>
                          <option value={"desc"}>Desc</option>
                        </select>
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label className="w-100">
                      <span>Order By Per Page</span>
                      <select
                          className="form-select form-select-sm my-2"
                          name={'direction'}
                          value={input.per_page}
                          onChange={handleSearch}
                        >
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                    </label>
                  </div>
                  <div className="col-md-2">
                    <div className="d-grid mt-4">
                      <button className="btn btn-sm btn-success my-2" onClick={()=> getCategoryList(1)}><i className="fa-solid fa-magnifying-glass"></i> Search</button>
                    </div>
                  </div>
               </div>
            </div>


              <div className="table-responsive">
                <table className="my-table table table-striped table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Name / Slug</th>
                      <th>Serial / Status</th>
                      <th>Photo</th>
                      <th>Created By</th>
                      <th>Date Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories && categories.length > 0 ? (
                      categories.map((category, index) => (
                        <tr key={index}>
                          <td>{startForm + index}</td>
                          <td>
                            <p className={"text-success"}>{category.name}</p>
                            <p className={"text-info"}>{category.slug}</p>
                          </td>
                          <td>
                            <p className={"text-success"}>{category.serial}</p>
                            <p className={"text-info"}>{category.status}</p>
                          </td>
                          <td>
                            <img
                              onClick={() => handlePhotoModal(category.photo_full)}
                              src={category.photo}
                              alt={category.name}
                              className={"img-thumbnail table-img"}
                            />
                          </td>
                          <td>{category.created_by}</td>
                          <td>
                            <p className={"text-success"}>
                              <small>{category.created_at}</small>{" "}
                            </p>
                            <p className={"text-info"}>
                              <small>{category.updated_at}</small>{" "}
                            </p>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-primary">
                              Edit
                            </button>
                            <button className="btn btn-sm btn-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No categories found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <CategoryPhotoModal
                  title={'Category Photo'}
                  photo={modalPhoto}
                  size={'lg'}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </div>
            <div className="cart-footer">
              <nav className="pagination-sm ms-3">
                <ReactPaginate
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    onChange={getCategoryList}
                    pageRangeDisplayed={5}
                    nextPageText={'next'}
                    firstPageText={'first'}
                    prevPageText={'previous'}
                    lastPageText={'last'}
                    itemClass={'page-item'}
                    linkClass={'page-link'}
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
