

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

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}/characters?limit=9&offset=200&${this._apiKey}`); //функція віддасть дані у форматі джсона
        
    }
    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`)
    }
}
export default MarvelService;