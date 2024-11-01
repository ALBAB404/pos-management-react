
import { BreadCrumb, Table } from "@/components";



const CategoryList = () => {
  const ignorFeilds = ["photo_full", "created_by", "created_at", "updated_at"]


  return (
    <>
    <BreadCrumb title={"Category List"} />
    <Table
       CardHeaderTitle={'Category List'}
       CardHeaderAddButtonLocation={"/category/create"}
       api_end_point_url={"categories"}
       CategoryPhotoModal={"Category Photo"}
       CategoryDetailsModal={"Category Details"}
       ignorFeilds={ignorFeilds}
     />
    </>
  );
};

export default CategoryList;
