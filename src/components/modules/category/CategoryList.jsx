import Constants from "@/Constants";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-js-pagination';
import axiosInstance from "@/services/axiosService.js";
import { BreadCrumb, CardHeader, CategoryPhotoModal } from "@/components";

const CategoryList = () => {
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startForm, setStartForm] = useState(1);
  const [activePage, setActivePage] = useState(1);
  
  const [modalShow, setModalShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [modalPhoto, setModalPhoto] = useState('');

  const handlePhotoModal = (photo) => {
    setModalPhoto(photo);
    setModalShow(true)
  }

  const getCategoryList = async (pageNumber) => {
    try {
      const response = await axiosInstance.get(
        `${Constants.BASE_URL}/categories?page=${pageNumber}`
      );
      console.log(response);
      
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
