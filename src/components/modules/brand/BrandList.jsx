
import { BreadCrumb, Table } from "@/components";



const BrandList = () => {


  return (
    <>
    <BreadCrumb title={"Brand List"} />
    <Table
       CardHeaderTitle={'Brand List'}
       CardHeaderAddButtonLocation={"/brand/create"}
       api_end_point_url={"brands"}
       CategoryPhotoModal={"Brand Photo"}
       CategoryDetailsModal={"Brand Details"}
     />
    </>
  );
};

export default BrandList;
