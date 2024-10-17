import { Helmet } from "react-helmet";

const BreadCrumb = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title> {/* Dynamically setting the title */}
      </Helmet>
      <ol className="breadcrumb my-4">
        <li className="breadcrumb-item">Dashboard</li>
        <li className="breadcrumb-item active text-danger">{title}</li>
      </ol>
    </>
  );
};

export default BreadCrumb;
