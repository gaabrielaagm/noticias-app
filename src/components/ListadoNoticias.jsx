import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import useNoticias from '../hooks/useNoticias'
import Noticia from './Noticia'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const ListadoNoticias = () => {
    const { noticias, totalNoticias, handleChangePagina, pagina } = useNoticias()
    const totalPaginas = Math.ceil(totalNoticias / 20)

    return (
        <>
            <Typography
                textAlign="center"
                marginY={5}
                variant='h3'
                context='h2'
            >
                Últimas Noticias
            </Typography>

            <Grid container spacing={3}>
                {noticias.map(noticia => (
                    <Noticia 
                        key={noticia.url}
                        noticia={noticia}
                    />
                ))}
            </Grid>

            <Stack 
                spacing={2}
                direction={'row'}
                justifyContent='center'
                alignItems='center'
                sx={{marginY: 5}}
            >
                <Pagination 
                    variant="outlined"
                    count={totalPaginas} 
                    color="secondary"
                    onChange={handleChangePagina}
                    page={pagina}
                />
            </Stack>
        </>
    )
}

export default ListadoNoticias