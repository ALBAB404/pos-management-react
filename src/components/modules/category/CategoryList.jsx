import { BreadCrumb, CardHeader } from "@/components";
import { useEffect, useState } from "react";
import axiosInstance from "@/services/axiosService.js";
import Constants from "@/Constants";


const CategoryList = () => {

  const [categories, setCategories] = useState([])

  const getCategoryList = async () =>{
    try {
      const response =  await axiosInstance.get(`${Constants.BASE_URL}/categories`)
      if (response?.status == 200) {
        setCategories(response.data.result);
      }else{
        return response;
      }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getCategoryList();
  }, [])
  

  return (
    <>
      <BreadCrumb title={"Category List"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader title='Category List' location='/category/create' buttonText='Add' buttonIcon='fa-solid fa-bars me-2 text-light' />
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
                    {
                      categories.map((category, index)=>(
                        <tr key={index}>
                          <td>{++index}</td>
                          <td>
                            <p>{category.name}</p>
                            <p>{category.slug}</p>
                          </td>
                          <td>
                            <p>{category.serial}</p>
                            <p>{category.status}</p>
                          </td>
                          <td>{category.photo}</td>
                          <td>{category.user_id}</td>
                          <td>
                            <p>{category.created_at}</p>
                            <p>{category.updated_at}</p>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-primary">Edit</button>
                            <button className="btn btn-sm btn-danger">Delete</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
