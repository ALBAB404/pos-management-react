import { BreadCrumb, CardHeader } from "@/components";
import {  useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SweetAlert from "../../../CommonFunction/SweetAlert";
import axiosInstance from "@/services/axiosService.js";
import Constants from "@/Constants";

const CategoryEdit = () => {
  const params = useParams();
  const [input, setInput] = useState({});
  const [category, setCategory] = useState({});
  const [errors, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


 // Category All data get by apis start 
 const getCategories = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`${Constants.BASE_URL}/get-category-list`)
      if (res?.status == 200) {
        setCategory(res.data.result)
      }else{
        setError(res.data.response.data.errors)
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }finally{
      setIsLoading(false);
    }
 };
// Category All data get by apis end 

 // Sub Category All data get by apis start 
 const getSubCategory = async () => {
  try {
    const response = await axiosInstance.get(`${Constants.BASE_URL}/sub-categories/${params.id}}`);      
    if (response?.status == 200) {
      setInput(response.data.data)
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
// Sub Category All data get by apis end 

  const handleInput = (e) => {
    if (e.target.name === 'name') {
      let slug = e.target.value
      slug = slug.toLowerCase().replaceAll(" ", "-");
      setInput((prevState) => ({...prevState, slug: slug}));
    }
    setInput((prevState) => ({...prevState,[e.target.name]: e.target.value}));
  };

  const handleSubCategoryUpdate = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.put(`${Constants.BASE_URL}/sub-categories/${params.id}`, input)

      if (res?.data?.status == 'success') {
        SweetAlert.successAlertMsm(res.data.status, res.data.message);        
        setIsLoading(false);
        navigate("/sub-category/list");
      }else{
        SweetAlert.successAlertMsm('error', 'Category create failed');   
        setError(res.response.data.errors)
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  };


  const handlePhotoChange = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setInput((prevState) => ({
        ...prevState,
        photo: reader.result,
      }));
    }
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    getSubCategory();
    getCategories();
  }, [])
  

  return (
    <>
      <BreadCrumb title={"Edit Sub Category"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader title='Edit Sub Category' location='/sub-category/list' buttonText='List' buttonIcon='fa-solid fa-plus me-2 text-light'/>
            <div className="card-body">
              <div className="row">
              <div className="col-md-6">
                <label htmlFor="" className="mt-4">
                    Categories
                  </label>

                  <select className={ errors.category_id != undefined ? "form-select mt-2 is-invalid" : "form-select mt-2" }
                    name={'category_id'}
                    value={input.category_id}
                    onChange={handleInput}
                    >
                    {Array.isArray(category) && category.length > 0 ? (
                      category.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    ) : (
                      <option>No categories available</option>
                    )}
                  </select>

                  <p className="text-danger">
                    {errors?.category_id != undefined ? errors?.category_id[0] : null}
                  </p>
                </div>
                <div className="col-md-6">
                  <label htmlFor="" className="mt-4">
                    Name
                  </label>
                  <input
                    className={
                      errors.name != undefined
                        ? "form-control mt-2 is-invalid"
                        : "form-control mt-2"
                    }
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={handleInput}
                    placeholder="Enter category name"
                  />
                  <p className="text-danger">
                    {errors?.name != undefined ? errors?.name[0] : null}
                  </p>
                </div>
                <div className="col-md-6">
                  <label htmlFor="" className="mt-4">
                    Slug
                  </label>
                  <input
                    className={
                      errors.slug != undefined
                        ? "form-control mt-2 is-invalid"
                        : "form-control mt-2"
                    }
                    type="text"
                    name="slug"
                    value={input.slug}
                    onChange={handleInput}
                    placeholder="Enter category slug"
                  />
                  <p className="text-danger">
                    {errors?.slug != undefined ? errors?.slug[0] : null}
                  </p>
                </div>
                <div className="col-md-6">
                  <label htmlFor="" className="mt-4">
                    Serial
                  </label>
                  <input
                    className={
                      errors.serial != undefined
                        ? "form-control mt-2 is-invalid"
                        : "form-control mt-2"
                    }
                    type="text"
                    name="serial"
                    value={input.serial}
                    onChange={handleInput}
                    placeholder="Enter category serial"
                  />
                  <p className="text-danger">
                    {errors?.serial != undefined ? errors?.serial[0] : null}
                  </p>
                </div>
                <div className="col-md-6">
                  <label htmlFor="" className="mt-4">
                    Status
                  </label>

                  <select className={ errors.status != undefined ? "form-select mt-2 is-invalid" : "form-select mt-2" }
                    name="status"
                    value={input.status}
                    onChange={handleInput}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                  </select>

                  <p className="text-danger">
                    {errors?.status != undefined ? errors?.status[0] : null}
                  </p>
                </div>
                <div className="col-md-6">
                  <label htmlFor="" className="mt-4">
                    Description
                  </label>

                  <textarea className={ errors.description != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2" }
                    name="description"
                    placeholder="Enter description"
                    value={input.description}
                    onChange={handleInput}
                    >
                  </textarea>

                  <p className="text-danger">
                    {errors?.status != undefined ? errors?.status[0] : null}
                  </p>
                </div>
                <div className="col-md-6">
                  <label htmlFor="" className="mt-4">
                    Photo
                  </label>

                  <input className={ errors.photo != undefined ? "form-control mt-2 is-invalid" : "form-control mt-2" }
                    name="photo"
                    type="file"
                    placeholder="Enter photo"
                    onChange={handlePhotoChange}
                    >
                  </input>
                  {
                    input.photo != undefined || input.photo_preview != undefined ?
                    <div className="row">
                      <div className="col-4">
                        <div className="photo-preview">
                          <img src={input.photo == undefined ? input.photo_preview : input.photo} className="img-thumbnail mt-4" alt="" />
                        </div>
                      </div>
                    </div>
                    : null
                  }

                  <p className="text-danger">
                    {errors?.photo != undefined ? errors?.photo[0] : null}
                  </p>
                </div>
                <div className="col-md-12">
                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <div className="d-grid">
                        <button className="btn btn-success" onClick={handleSubCategoryUpdate}
                          dangerouslySetInnerHTML={{
                            __html: isLoading
                              ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading....'
                              : 'Update Category',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryEdit;
