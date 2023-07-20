const qs = require('qs');
function sdk(){

    const API_URL = 'http://127.0.0.1:1337/api';
    const ITEMS_PER_PAGE = 3;

    async function getPostsPage(page) {

        const params = {
            pagination : {
              pageSize : ITEMS_PER_PAGE
            },
            fields : ['title', 'description'],
            populate: ['categorie']
        };
        const query = qs.stringify(params, { encodeValuesOnly: true });
        const response = await fetch(`${API_URL}/posts?`+query, {
            method: 'GET',
        });
        const result = await response.json();
        const body = flattenStrapiObject(result.data);

        console.log(body);
    }

    getPostsPage(1);
}

//sdk();



function page2(id){

    const API_URL = 'http://127.0.0.1:1337/api';

    async function getPostsPage(page) {

        const params = {
            filters : {
                id : {
                    $eq : id
                }
            },
            fields : ['title', 'description'],
            populate: ['categorie', 'author', 'comments']
        };
        const query = qs.stringify(params, { encodeValuesOnly: true });
        const response = await fetch(`${API_URL}/posts?`+query, {
            method: 'GET',
        });
        const result = await response.json();
        const body = flattenStrapiObject(result.data);

        console.log(body);
    }

    getPostsPage(1);
}
const id = 1;
page2(id);



function flattenStrapiObject (data) {
    const isObject = (data) =>
        Object.prototype.toString.call(data) === "[object Object]";
    const isArray = (data) =>
        Object.prototype.toString.call(data) === "[object Array]";

    const flatten = (data) => {
        if (!data.attributes) return data;

        return {
            id: data.id,
            ...data.attributes,
        };
    };

    if (isArray(data)) {
        return data.map((item) => flattenStrapiObject(item));
    }

    if (isObject(data)) {
        if (isArray(data.data)) {
            data = [...data.data];
        } else if (isObject(data.data)) {
            data = flatten({ ...data.data });
        } else if (data.data === null) {
            data = null;
        } else {
            data = flatten(data);
        }

        for (const key in data) {
            data[key] = flattenStrapiObject(data[key]);
        }

        return data;
    }

    return data;
};