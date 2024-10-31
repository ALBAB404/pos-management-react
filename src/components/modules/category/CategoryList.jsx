
import { BreadCrumb, Table } from "@/components";



const CategoryList = () => {


  return (
    <>
    <BreadCrumb title={"Category List"} />
    <Table
       CardHeaderTitle={'Category List'}
       CardHeaderAddButtonLocation={"/category/create"}
       api_end_point_url={"categories"}
       CategoryPhotoModal={"Category Photo"}
       CategoryDetailsModal={"Category Details"}
     />
    </>
  );
};

export default CategoryList;
