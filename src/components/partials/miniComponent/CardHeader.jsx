import { Link } from "react-router-dom";

const CardHeader = ({title, location, buttonText, buttonIcon = null}) => {
  return (
    <>
      <div className="card-header">
        <div className="d-flex justify-content-between">
          <h3>{title}</h3>
            <Link className="btn btn-info text-light" to={location}>
              <i className={buttonIcon}></i>
              {buttonText}
            </Link>
        </div>
      </div>
    </>
  );
};

export default CardHeader;
