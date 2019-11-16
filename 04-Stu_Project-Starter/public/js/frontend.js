
var modal2= document.querySelector('.modal2');
var modalBtn= document.querySelector('.modal-btn');

var modalClose= document.querySelector('.modal-close');


modalBtn.addEventListener('click',function(){
    modal2.classList.add('modal2');
});
modalClose.addEventListener('click',function(){
    modal2.classList.remove('modal2');
});