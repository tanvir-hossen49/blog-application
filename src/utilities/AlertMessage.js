import Swal from "sweetalert2";

export function showAlertMessage({
    title = 'Oops',
    text,
    confirmButtonText
}) {
    return Swal.fire({
      title: title,
      text:  text,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText
    });
}