/*
https://vuetifyjs.com/en/components/snackbars/
*/
export default {
  configs: {
    status: 'visible', // 'hidden'
    timeout: 0, // Use 0 to keep open indefinitely
    type: 'success', // 'info' , 'error'
    positionX: null, // 'left', 'right'
    positionY: 'bottom',// 'top'
    mode: '', // 'vertical', 'multi-line'
    customColor: null,
    confimButtonText: 'close', // 'confirm'
    showConfirmButton: false,
    message: 'testing.success', // '{where}.{status}'
  },
}
