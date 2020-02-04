'use strict';

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for(let i = 0; i < responseJson.length; i++) {
        $('#results-list').append(
            `<li>
                <h2>${responseJson[i].name}</h2>
                <p>${responseJson[i].svn_url}</p>
            </li>`
        )
    };

    $('#results').removeClass('hidden');
}


function getRepos(gitHubUser) {
    const url = "https://api.github.com/users/" + gitHubUser + "/repos";
    console.log(url);

    fetch(url).then(response => {
        console.log(response)
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    }).then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function whenFormSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        const githubUser = $('#js-search-term').val();
        $('#js-search-term').val("")
        getRepos(githubUser);
    });
}


$(whenFormSubmit())