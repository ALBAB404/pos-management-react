
import { BreadCrumb, Table } from "@/components";



const BrandList = () => {
  const ignorFeilds = ["photo_full", "created_by", "created_at", "updated_at"]


  return (
    <>
    <BreadCrumb title={"Brand List"} />
    <Table
       CardHeaderTitle={'Brand List'}
       CardHeaderAddButtonLocation={"/brand/create"}
       api_end_point_url={"brands"}
       CategoryPhotoModal={"Brand Photo"}
       CategoryDetailsModal={"Brand Details"}
       ignorFeilds={ignorFeilds}
     />
    </>
  );
};

export default BrandList;
