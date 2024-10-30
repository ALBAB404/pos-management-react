import { BreadCrumb, CardHeader } from "@/components";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SweetAlert from "../../../CommonFunction/SweetAlert";
import axiosInstance from "@/services/axiosService.js";
import Constants from "@/Constants";


const BrandAdd = () => {
  const [input, setInput] = useState({});
  const [brand, setBrand] = useState({});
  const [errors, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    if (e.target.name === 'name') {
      let slug = e.target.value
      slug = slug.toLowerCase().replaceAll(" ", "-");
      setInput((prevState) => ({...prevState, slug: slug}));
    }
    setInput((prevState) => ({...prevState,[e.target.name]: e.target.value}));
  };

  // const getBrands = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axiosInstance.get(`${Constants.BASE_URL}/get-category-list`)
  //     if (res?.status == 200) {
  //       setBrand(res.data.result)
  //     }else{
  //       setError(res.data.response.data.errors)
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log(error);
  //   }finally{
  //     setIsLoading(false);
  //   }
  // };

  const handleBrandCreate = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post(`${Constants.BASE_URL}/brands`, input)
      if (res?.data?.status == 'success') {
        SweetAlert.successAlertMsm(res.data.status, res.data.message);        
        setIsLoading(false);
        // navigate("/brand/list");
      }else{
        SweetAlert.successAlertMsm('error', 'Brand create failed');   
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
    // getBrands();
  }, [])

  return (
    <>
      <BreadCrumb title={"Add Brand"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader title='Add Brand' location='/brand/list' buttonText='List' buttonIcon='fa-solid fa-plus me-2 text-light'/>
            <div className="card-body">
              <div className="row">
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
                    placeholder="Enter brand name"
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
                    placeholder="Enter brand slug"
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
                    placeholder="Enter brand serial"
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
                    input.photo != undefined ?
                    <div className="row">
                      <div className="col-4">
                        <div className="photo-preview">
                          <img src={input.photo} className="img-thumbnail mt-4" alt="" />
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
                        <button className="btn btn-success" onClick={handleBrandCreate}
                          dangerouslySetInnerHTML={{
                            __html: isLoading
                              ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading....'
                              : 'Add Brand',
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

export default BrandAdd;