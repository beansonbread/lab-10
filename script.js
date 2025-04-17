document.getElementById("fetch").addEventListener("click", function() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ');
        } else {
            return response.json();
        }
        })
        .then(data => {
            console.log(data);
            displayData(data);
        })
        .catch(error => console.error('Error fetching posts:', error));
});

document.getElementById("xhr").addEventListener("click", function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);
    xhr.onreadystatechange = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            displayData(data);
        } else {
            console.error('Error fetching data:', xhr.statusText);
        }
    };

    xhr.send();
});

document.getElementById("postForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const message = document.getElementById("message").value;

    const postData = {
        title: title,
        body: message,
    };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        if (response.ok) {
            const data = await response.json();
            alert('Post created successfully!');
            console.log(data);
        } else {
            throw new Error('Network response was not ok ');
        }
    } catch (error) {
        console.error('Error creating post:', error);
    }

});

function displayData(data) {
    const postContainer = document.getElementById('data');
    postContainer.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.body}</p>
    `;
}

document.getElementById("update").addEventListener("click", function(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const message = document.getElementById("message").value;
    const id = document.getElementById("postID").value;

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            alert('Post updated successfully!');
            console.log(response);
        } else {
            alert('Error updating post!');
            console.error('Error updating post:');
        }
    }; 

    const data = JSON.stringify({
        title: title,
        body: message,
    });
    xhr.send(data);
});