import { BreadCrumb, CardHeader, CategoryPhotoModal } from "@/components";
import { useEffect, useState } from "react";
import axiosInstance from "@/services/axiosService.js";
import Constants from "@/Constants";

const CategoryList = () => {
  const [modalShow, setModalShow] = useState(false);

  const [categories, setCategories] = useState([]);
  const [modalPhoto, setModalPhoto] = useState('');

  const handlePhotoModal = (photo) => {
    setModalPhoto(photo);
    setModalShow(true)
  }

  const getCategoryList = async () => {
    try {
      const response = await axiosInstance.get(
        `${Constants.BASE_URL}/categories`
      );
      if (response?.status == 200) {
        setCategories(response.data.data);
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
          <div className="card">
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
                          <td>{++index}</td>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
