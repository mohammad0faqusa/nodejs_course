// type is 'success' or 'error'
const hideAlert = ()=> {
    const el = document.querySelector('.alert');
    // console.log('child will be removed', el)
    if(el) el.parentElement.removeChild(el); 

}
export const showAlert = async (type, msg) => {

    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
}