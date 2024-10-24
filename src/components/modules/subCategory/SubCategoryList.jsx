import Constants from "@/Constants";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-js-pagination';
import axiosInstance from "@/services/axiosService.js";
import { BreadCrumb, CardHeader, CategoryPhotoModal, CategoryDetailsModal, TableSkeleton } from "@/components";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import SweetAlert from "../../../CommonFunction/SweetAlert";


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
  const [modalShow, setModalShow]           = useState(false);
  const [modalPhotoShow, setModalPhotoShow] = useState(false);
  const [modalPhoto, setModalPhoto]         = useState('');
//Modla photo showign end
//Modla category showing start
  const [category, setCategory] = useState([]);
//Modla category showing end
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

 // Category All data get by apis start 
  const getSubCategoryList = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${Constants.BASE_URL}/sub-categories?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`);      
      if (response?.status == 200) {
        setCategories(response.data.data);
        setItemsCountPerPage(response.data.meta.per_page);
        setStartForm(response.data.meta.from);
        setTotalItemsCount(response.data.meta.total);
        setActivePage(response.data.meta.current_page);
        setLoading(false);
      } else {
        setLoading(false);
        return response;
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
// Category All data get by apis end 

//Modla photo showign start
    const handlePhotoModal = (photo) => {
      setModalPhoto(photo);
      setModalPhotoShow(true)
    }
//Modla photo showign end

//Modlacategory showing start
    const handleCategoryShowing = (category) => {
      setCategory(category);
      setModalShow(true)
    }
//Modla category showing end

//category delete start
    const handleCategoryDelete = async (categoryId) => {
      Swal.fire({
        title: "Are you sure?",
        text: "Category Will Be Deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete It !"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axiosInstance.delete(`${Constants.BASE_URL}/sub-categories/${categoryId}`);      
          if (response.status == 200) {
            getSubCategoryList();
            SweetAlert.successAlertMsm(response.data.status, response.data.message);
          }else{
            SweetAlert.successAlertMsm('error', 'Category Not deleted');
          }
        }
      });
    }
//category delete end

// searching part start
  const handleSearch = (e) => {
    setInput((prevState) => ({...prevState,[e.target.name]: e.target.value}));
  };
// searching part end

  useEffect(() => {
    getSubCategoryList();
  }, []);

  return (
    <>
      <BreadCrumb title={"Sub Category List"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <CardHeader
              title="Category List"
              location="/sub-category/create"
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
                      <button className="btn btn-sm btn-success my-2" onClick={()=> getSubCategoryList(1)}><i className="fa-solid fa-magnifying-glass"></i> Search</button>
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
                            <button className="btn btn-sm btn-info mx-1" onClick={()=>{handleCategoryShowing(category)}}><i className="fa-solid fa-eye"></i></button>
                            <Link to={`/category/edit/${category.id}`}><button className="btn btn-sm btn-warning mx-1"><i className="fa-solid fa-edit"></i></button></Link>
                            <button className="btn btn-sm btn-danger mx-1" onClick={()=>{handleCategoryDelete(category.id)}}><i className="fa-solid fa-trash"></i></button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      loading ? <TableSkeleton trForItem={9} tdForItem={7} /> :
                      <tr>
                        <td colSpan={7} className="text-center">
                          <p>No data found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <CategoryPhotoModal
                  title={'Category Photo'}
                  photo={modalPhoto}
                  size={'lg'}
                  show={modalPhotoShow}
                  onHide={() => setModalPhotoShow(false)}
                />

                <CategoryDetailsModal
                  title={'Category Details Show'}
                  category={category}
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
                    onChange={getSubCategoryList}
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
