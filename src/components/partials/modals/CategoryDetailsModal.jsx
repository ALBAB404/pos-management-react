import Modal from "react-bootstrap/Modal";

const CategoryDetailsModal = (props) => {
  return (
    <>
      <Modal
        {...props}
        size={props.size}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <table className="my-table table table-striped table-hover table-bordered">
              <tbody>
                <tr>
                  <td>SL</td>
                  <td>{props.category.id}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{props.category.name}</td>
                </tr>
                <tr>
                  <td>slug</td>
                  <td>{props.category.slug}</td>
                </tr>
                {
                  props.category.category_name ?  
                  <tr>
                    <td>Category Name</td>
                    <td>{props.category.category_name}</td>
                  </tr> : null
                }
                <tr>
                  <td>serial</td>
                  <td>{props.category.serial}</td>
                </tr>
                <tr>
                  <td>description</td>
                  <td>{props.category.description}</td>
                </tr>
                <tr>
                  <td>status</td>
                  <td>{props.category.status}</td>
                </tr>
                <tr>
                  <td>created_by</td>
                  <td>{props.category.created_by}</td>
                </tr>
                <tr>
                  <td>created_at</td>
                  <td>{props.category.created_at}</td>
                </tr>
                <tr>
                  <td>updated_at</td>
                  <td>{props.category.updated_at}</td>
                </tr>
                <tr>
                  <td>photo</td>
                  <td>
                    <img
                      src={props.category.photo}
                      alt={props.category.name}
                      className={"img-thumbnail"}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CategoryDetailsModal;
