const logError = (ret) => {
    if (ret.code !== 20000) {
        alert(ret.body);
        return ;
    }
    
    return Promise.resolve(ret.body);
}

const getCategories = () => {
    var myInit = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };

    var myRequest = new Request('http://localhost:8080/blog_api/category/list');

    return fetch(myRequest, myInit).then(function (response) {
        return response.json().then(logError);
    });
}

const getPosts = () => {
    var myInit = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };

    var myRequest = new Request('http://localhost:8080/blog_api/post/list');

    return fetch(myRequest, myInit).then(function (response) {
        return response.json().then(logError);
    });
}

export { getCategories, getPosts };