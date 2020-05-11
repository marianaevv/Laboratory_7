

const API_TOKEN = "2abbf7c3-245b-404f-9473-ade729ed4653"

function addBookmark (title, description, url, rating){
    let urlCreate = '/api/createBookmark';
    let book = {
        title:title,
        description:description,
        url:url,
        rating,rating
    }

    let settings = {
        method:'POST',
        headers : {
            Authorization : `Bearer ${API_TOKEN}`,
			'Content-Type' : 'application/json'
        },
        body : JSON.stringify( book )
    }
    let results = document.querySelector('.results');
    fetch(urlCreate, settings)
    .then(response=>{
        if(response.ok){
            return response.json();
        }
        throw new Error (response.statusText);
    })
    .then(responseJSON =>{
        getAllBookmarks();
    })
    .catch(err=>{
        results.innerHTML = err.message;
    })

}

function fetchBookmark(title){
    let url = `/api/bookmarksByTitle?title=${title}`;
    let settings = {
        method : 'GET',
        headers : {
            Authorization:`Bearer ${API_TOKEN}`
        }
    }
	fetch( url, settings )
		.then( response => {
			if( response.ok){
				return response.json();
			}
			else{
				throw new Error( response.statusText);
			}
		})
		.then( responseJSON =>{
			displayResults(responseJSON);
		})
		.catch( err => {
			results.innerHTML = err.message;
        });
}
function displayResults (data){
    let results = document.querySelector('.results');
    
    for(let i = 0; i < data.length; i++){
        results.innerHTML = "";		
				results.innerHTML += `
				<div class="item">
					<p>${data[i].title}</p>
						<p>${data[i].description}</p>
						<p>${data[i].url}</p>
						<p>${data[i].rating}</p>
				</div>	`
    }
}



function getAllBookmarks() {

	let urlAll = '/api/bookmarks';
	let settings = {
		method : 'GET',
		headers : {
            Authorization : `Bearer ${API_TOKEN}`
        }
	}
	let results = document.querySelector('.results');

	fetch( urlAll, settings )
		.then( response => {
			if( response.ok){
				return response.json();
			}
				throw new Error( response.statusText);
		})
		.then (responseJSON => {
			results.innerHTML = "";
			for(let i = 0; i < responseJSON.length; i++){
				results.innerHTML += `
				<div class="item">
					<p>${responseJSON[i].title}</p>
					<p>${responseJSON[i].id}</p>
				    <p>${responseJSON[i].description}</p>
					<p>${responseJSON[i].url}</p>
					<p>${responseJSON[i].rating}</p>
				</div>`
			}
		})
		.catch( err => {
			results.innerHTML = err.message;
		});
}
function deleteBookmark(id) {
	let urlDelete = `/api/deleteBookmark/${id}`;

	let settings = {
		method : 'DELETE',
		headers : {
            Authorization : `Bearer ${API_TOKEN}`
        }
	}

	let results = document.querySelector('.results');

	fetch(urlDelete, settings )
	.then( response => {
		if( response.ok){
			return response;
		}
		else{
			throw new Error( response.statusText);
		}
	})
	.then( responseJSON => {
		
		getAllBookmarks();
	})
	.catch( err => {
		results.innerHTML = err.message;
	});
}
function updateBookmark (id, bookmarkToUpdate){
    let urlUpdate = `'/bookmark/${id}`;

	let settings = {
		method : 'PATCH',
		headers : {
			Authorization : `Bearer ${API_TOKEN}`,
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify( bookmarkToUpdate )
	}

	let results = document.querySelector('.results');

	fetch( urlUpdate, settings )
	.then(response => {
		if(response.ok){
			return response.json();
		}
		else{
			throw new Error (response.statusText);
		}
	})
	.then(responseJSON => {
		getAllBookmarks();
	})
	.catch( err => {
		results.innerHTML = err.message;
	});
}


function watchForm (){
    let btnGet = document.querySelector('.getBtn');
    btnGet.addEventListener('click', (event)=>{
        event.preventDefault();
        console.log("Click the buttons");
        let title = document.querySelector('.titleToGet');
        fetchBookmark(title.value);
    });

    let btnAllBooks = document.querySelector('.getAllBtn');
    btnAllBooks.addEventListener('click',(event)=>{
        event.preventDefault();
        console.log("Click all");
        getAllBookmarks();
    });

    let btnAdd = document.querySelector('.addBtn');
    btnAdd.addEventListener('click',(event)=>{
        event.preventDefault();
        let title = document.querySelector('.titleToAdd');
        let description = document.querySelector('.descriptionToAdd');
        let url = document.querySelector('.urlToAdd');
        let rating = document.querySelector('.ratingToAdd');
        addBookmark(title.value, description.value, url.value, rating.value);
    })

    let btnDelete = document.querySelector('.deleteBtn');
    btnDelete.addEventListener('click', (event)=>{
        event.preventDefault();
        let id = document.querySelector('.idToDelete');
        deleteBookmark(id.value);
    })
    let btnUpdate = document.querySelector('.updateBtn');
    btnUpdate.addEventListener('click', (event)=>{
        event.preventDefault();
        let id = document.querySelector('.idToUpdate');
        let title = document.querySelector('.titleToUpdate');
        let description = document.querySelector('.descriptionToUpdate');
        let url = document.querySelector('.urlToUpdate');
        let rating = document.querySelector('.ratingToUpdate');

        let bookmarkToUpdate = {id};

		if(title){
			bookmarkToUpdate.title = title;
		}
		if(description){
			bookmarkToUpdate.description = description;
		}
		if(url){
			bookmarkToUpdate.url = url;
		}
		if(rating){
			bookmarkToUpdate.rating = rating;
		}

		updateBookmark(id, bookmarkToUpdate);

    })
}
function init(){
    watchForm();
    getAllBookmarks();
}

init();