import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CardHeader = ({title, createAndEditModalShowAndHide, buttonText, buttonIcon = null, handleModalClose}) => {

  const [isTrue, setIsTrue] = useState(false);

  const handleModalShowAndHide = () => {
    const newValue = !isTrue 
    setIsTrue(newValue);
    createAndEditModalShowAndHide(newValue);
  }

  useEffect(() => {
    setIsTrue(handleModalClose);
  }, [handleModalClose])
  

  return (
    <>
      <div className="card-header">
        <div className="d-flex justify-content-between">
          <h3>{title}</h3>
            <button className="btn btn-info text-light" onClick={handleModalShowAndHide}>
              <i className={buttonIcon}></i>
              {buttonText}
            </button>
        </div>
      </div>
    </>
  );
};

export default CardHeader;
