import Swal from "sweetalert2";

export function showAlertMessage({
    title = 'Oops',
    text,
    confirmButtonText,
    showCancelButton = true,
    icon = 'info',
    ...props
}) {
    return Swal.fire({
      title: title,
      text:  text,
      icon: icon,
      showCancelButton: showCancelButton,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      ...props
    });
}