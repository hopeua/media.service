import Fetch from 'node-fetch';
import App from 'server/server';

async function isResourceExists(url) {
    let exists = null;
    try {
        exists = await App.cache.getAsync(url);
    } catch (error) {
        console.error(error.message);
    }

    if (exists === null) {
        const response = await Fetch(url, {
            method: 'HEAD'
        });
        exists = response.status === 200;

        App.cache.setAsync(url, exists);
    }

    return exists;
}

export default class imageLoader {
    static async episodeCover(uid) {
        let url = `https://cdn.hope.ua/media/shows/${uid.substring(0, 4)}/episodes/${uid.substring(4)}/${uid}-cover.jpg`;

        if (!await isResourceExists(url)) {
            url = 'Not found';
        }

        return url;
    }
}
