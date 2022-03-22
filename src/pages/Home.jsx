import { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    ListItemText,
    Menu,
    MenuItem,
    OutlinedInput,
    Select,
    Typography
} from '@mui/material';
import { Add, MoreHoriz } from '@mui/icons-material';
import Helmet from "react-helmet";
import layoutPages from '../theme/layoutPages';
import getData from '../__mocks__/data.json';
import filterType from '../utils/filterType';
import FilterCards from '../components/home/FilterCards';
import HomeCards from '../components/home/HomeCards';

const data = getData.data;

export default function Home() {
    const theme = layoutPages();
    const [research, setResearch] = useState([]);

    return (
        <>
            <Helmet>
                <title>Home | Frontend-test</title>
            </Helmet>
            <Box className={theme.boxContainer}>
                <Container>
                    <Grid  container spacing={4}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={8}
                        >
                            <Grid container spacing={1}>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    display="flex"
                                    justifyContent="space-between"
                                    gap={2}
                                >
                                    <Typography fontSize={35} color="secondary">
                                        Endomarketing
                                    </Typography>

                                    <Box
                                        sx={{
                                            width: '60%',
                                            display: 'flex',
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                        <FilterCards
                                            data={data}
                                            research={research}
                                            setResearch={setResearch}
                                        />

                                        <Button
                                            variant="contained"
                                            color="ternary"
                                            endIcon={<Add sx={{ ml: 4 }} />}
                                            sx={{ fontWeight: 'bold', ml: 1 }}
                                        >
                                            criar
                                        </Button>
                                    </Box>
                                </Grid>

                                {
                                    data.map(item => {
                                        if (research.length < 1) {
                                            return (
                                                <HomeCards
                                                    key={item.id}
                                                    item={item}
                                                    data={data}
                                                />
                                            )
                                        } else if (filterType(research, item.type)) {
                                            return (
                                                <HomeCards
                                                    key={item.id}
                                                    item={item}
                                                    data={data}
                                                />
                                            )
                                        }
                                    })
                                }
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={4}
                        > 
                            <Box
                                sx={{
                                    width: 278,
                                    boxSizing: 'border-box',
                                    padding: '28px 22px',
                                    backgroundColor: '#fff2de',
                                    border: '1px solid #dcd1c0'
                                }}
                            >
                                <Typography
                                    textAlign="justify"
                                    color="secondary"
                                    fontWeight="bold"
                                    fontSize={16}
                                >
                                    Endormarketing
                                </Typography>

                                <Typography
                                    mt={1.5}
                                    mb={3.25}
                                    textAlign="justify"
                                    color="secondary"
                                    fontWeight="light"
                                    fontSize={14}
                                    lineHeight={1.32}
                                >
                                    Endomarketing está relacionado às ações de treinamento ou qualificação dos colaboradores da empresa visando um melhor serviço para o cliente. Marketing interno, devido ao nome, é usualmente confundido com Endomarketing mesmo sendo conceitos diferentes.
                                </Typography>
                                
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ fontWeight: 'bold', letterSpacing: 0 }}
                                >
                                    dispensar
                                </Button>
                            </Box>

                            <Box
                                sx={{
                                    mt: 2,
                                    width: 278,
                                    borderRadius: 2,
                                    boxSizing: 'border-box',
                                    padding: 1,
                                    boxShadow: '2px 2px 5px #ccc',
                                    backgroundColor: '#fdfdfd'
                                }}
                            >
                                <Typography
                                    textAlign="justify"
                                    color="secondary"
                                    fontWeight="bold"
                                    fontSize={16}
                                    mb={1.5}
                                >
                                    Quadros de Gestão à Vista
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}