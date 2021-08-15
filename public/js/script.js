// get the update button
const updateBtns = document.getElementsByClassName('updateBtns');
const bookForm = document.getElementById('bookForm');
[...updateBtns].forEach(updateBtn => {
    updateBtn.addEventListener('click', event => {
        const { bookname, authorname, shortdescription, id } = event.target.dataset;
        bookForm[0].value = bookname;
        bookForm[1].value = authorname;
        bookForm[2].value = shortdescription;
        bookForm[4].value = id;
        bookForm[5].value = 'Update';
    })
}) 
