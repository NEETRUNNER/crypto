import Select from 'react-select'
import { usePropsContext } from './StateContext';
import { ComponentRef, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { CoinData } from './StateContext';

const SearchCoins = () => {
    const {currentPage} = usePropsContext();
    const ref = useRef<HTMLDivElement>(null);
    console.log(ref.current)

    const [inputData, setInputData] = useState<string | undefined>();
    const [filterCoins, setFilterCoins] = useState<CoinData[]>([]);
    const {data} = usePropsContext();

    const searchCoins = data.filter(item => item.id.includes(inputData ? inputData : ' '))

    useEffect(() => {
        setFilterCoins(searchCoins);
    }, [inputData])

    const hideFilter = () => {
        document.addEventListener('click', (e) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                console.log('Вне окна')
                setInputData('')
            } else {
                console.log('На окне')
            }
        })
    }

    useEffect(() => {
        document.addEventListener('click', hideFilter);
        return () => document.removeEventListener('click', hideFilter);
    }, [])

    return (
        <div className="search-coins relative z-30">

        <div className="relative">
            <input
            className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={inputData || ''}
            onChange={(e) => setInputData(e.target.value.toLowerCase())}
            placeholder="Пошук монети" 
            />
            <button
            className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
            Пошук
            </button> 

        </div>
            <div ref={ref} className='max-h-80 w-56 overflow-x-auto absolute bg-white'>
                <>
                {filterCoins.map((item, index) => {
                    return <Link onClick={() => setInputData('')} className='flex items-center bg-white w-full p-2' key={index} to={`/coins/${currentPage}/${item.id}`}>
                       <div className="flex items-center">
                            <img className='w-8' src={item.icon} alt="" />
                            <h1 className="ml-2 text-black uppercase font-medium text-sm">{item.id}</h1>
                        </div>
                    </Link>
                })}
                </>
            </div>
        </div>
    )
}

export default SearchCoins;