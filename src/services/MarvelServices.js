

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'; // lowDash щзначає шо ми не можемо змінуювати значення даної властивості
    _apiKey = 'apikey=a37789c881bba75dee398a9bb7b5eaba';

    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`)
        }

        return await res.json();//тут повертається проміс
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}/characters?limit=9&offset=200&${this._apiKey}`); //функція віддасть дані у форматі джсона
        return res.data.results.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }

    
}
export default MarvelService;