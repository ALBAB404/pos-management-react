import Swal from 'sweetalert2'


const SweetAlert = {
  deleteAlertMsm(status, message) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.successAlertMsm(status, message)
      }
    });
  },
  successAlertMsm(status, message) {
    Swal.fire({
      position: "top-end",
      icon: status,
      title: message,
      showConfirmButton: false,
      timer: 1000
    });
  }
};

export default SweetAlert;