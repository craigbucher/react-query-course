import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query'
import Character from './Character';

// must also import {QueryClientProvider, QueryClient} from 'react-query' in main App.js

export default function Characters() {

    const[page, setPage] = useState(1);
    
    const fetchCharacters = async ({queryKey}) => {
        // second element of queryKey is page number
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`);
        return response.json();
    }

    // (query key, function to call)
    // change query key to array to allow multiple values
    // ensures each query is unique (by page)
    const {data, status, isLoading, isError} = useQuery(['characters', page], fetchCharacters, {keepPreviousData: true})
    
    // if(status === 'loading'){
    if(isLoading){
        return <div><h1>Loading...</h1></div>
    }
    
    // if(status === 'error'){
    if(isError){
        return <div><h1>Error</h1></div>
    }

    console.log(data)

    return (
        <div className='characters'>
           {data.results.map((character) => (
            <Character character={character} key={ character.id }/>
           ))} 
           <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={!data.info.prev}
            >Previous
        </button>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={!data.info.next}
            >Next
        </button>
        </div>
    )
}