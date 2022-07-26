import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const NoticiasContext = createContext()

const NoticiasProvider = ({children}) => {
    const [categoria, setCategoria] = useState('general')
    const [noticias, setNoticias] = useState([])
    const [pagina, setPagina] = useState(1)
    const [totalNoticias, setTotalNoticias] = useState(0)
    let url

    const handleChangePagina = (e, valor) => {
        setPagina(valor)
    }

    useEffect(() => {
        url = `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`
        setPagina(1)
        consultarAPI()
    }, [categoria])

    useEffect(() => {
        url = `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&page=${pagina}&apiKey=${import.meta.env.VITE_API_KEY}`
        consultarAPI()
    }, [pagina])

    const consultarAPI = async () => {
        console.log(url)
        const { data: { articles, totalResults } } = await axios(url)
        setNoticias(articles)
        setTotalNoticias(totalResults)
    }

    const handleChangeCategoria = e => {
        setCategoria(e.target.value)
    }

    return ( 
        <NoticiasContext.Provider
            value={{
                categoria,
                handleChangeCategoria,
                noticias,
                totalNoticias,
                handleChangePagina, 
                pagina
            }}
        >
            {children}
        </NoticiasContext.Provider>
    )
}

export {
    NoticiasProvider
}

export default NoticiasContext