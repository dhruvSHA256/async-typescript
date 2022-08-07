import fetch from "node-fetch"

const api = 'https://pokeapi.co/api/v1/pokemon'

interface PokemonList {
    count: number;
    next: string;
    previous?: any;
    results: {
        name: string;
        url: string;
    }[];
}

interface Pokemon {
    id: number;
    name: string;
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
}

const getPokemonList = async (): Promise<PokemonList> => {
    const listResp = await fetch(api);
    return listResp.json();
};

const getPokemon = async (url: string): Promise<Pokemon> => {
    const pokeResp = await fetch(url);
    return pokeResp.json();
};

// DIY promise
// const getFirstPokemon = async (): Promise<Pokemon> => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const list: PokemonList = await getPokemonList();
//             resolve(await getPokemon(list.results[0].url));
//         } catch (error) {
//             reject(error);
//         }
//     })
// }

const main = async () => {
    try {
        const pokeList = await getPokemonList();
        for (const poke of pokeList.results) {
            console.log(poke.name);
        }
        const pokemon = await getPokemon(pokeList.results[0].url);
        console.log(pokemon.name);
    } catch (err) {
        console.error(err);
    }
};

main();
