import Constants from "@/Constants";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-js-pagination';
import axiosInstance from "@/services/axiosService.js";
import { BreadCrumb, Table } from "@/components";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import SweetAlert from "../../../CommonFunction/SweetAlert";


const CategoryList = () => {
  const ignorFeilds = ["photo_full", "created_by", "created_at", "updated_at"]
  
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
    const handleSubCategoryShowing = (category) => {
      setCategory(category);
      setModalShow(true)
    }
//Modla category showing end

//category delete start
    const handleSubCategoryDelete = async (categoryId) => {
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
      <Table
        CardHeaderTitle={'Sub Category List'}
        CardHeaderAddButtonLocation={"/sub-category/create"}
        api_end_point_url={"sub-categories"}
        CategoryPhotoModal={"Sub Category Photo"}
        CategoryDetailsModal={"Sub Category Details"}
        ignorFeilds={ignorFeilds}
      />
    </>
  );
};

export default CategoryList;
