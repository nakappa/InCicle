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

const data = getData.data;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 94,
    },
  },
};

export default function Home() {
    const theme = layoutPages();
    const [research, setResearch] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setResearch(
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const options = () => {
        const types = [];

        data.forEach(item => {
            if (types.indexOf(item.type) === -1) {
                types.push(item.type);
            }
        });
        
        return types;
    };

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
                                        <FormControl
                                            sx={{
                                                minWidth: 94,
                            
                                                '& label': { top: -7 }                            
                                            }}
                                        >
                                            <InputLabel id="types" color="secondary">TIPO</InputLabel>
                                            <Select
                                                labelId="types"
                                                id="multiple-checkbox"
                                                multiple
                                                color="secondary"
                                                value={research}
                                                variant="outlined"
                                                onChange={handleChange}
                                                input={
                                                    <OutlinedInput
                                                        label="TIPO"
                                                        sx={{
                                                            height: 39,
                                                            backgroundColor: '#fff'
                                                        }}
                                                    />
                                                }
                                                renderValue={(selected) => {
                                                    const newValue = [];
                            
                                                    selected.forEach(el => {
                                                        el === 'event'
                                                            ? newValue.push('evento')
                                                            : el === 'release'
                                                                ? newValue.push('comunicado')
                                                                : newValue.push('publicação')
                                                    });
                            
                                                    return newValue.join(', ');
                                                }}
                                                MenuProps={MenuProps}
                                            >
                                                {options().map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    <Checkbox checked={research.indexOf(option) > -1} color="secondary" />
                                                    <ListItemText
                                                        primary={
                                                            option === 'event'
                                                                ? 'evento'
                                                                : option === 'release'
                                                                    ? 'comunicado'
                                                                    : 'publicação'
                                                        }
                                                    />
                                                </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

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
                                    data.map(item => (
                                        <Grid
                                            key={item.id}
                                            item
                                            xs={12}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '11px 11px 9px',
                                                    backgroundColor: '#fff',
                                                    boxShadow: '2px 2px 5px #ccc'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <Avatar
                                                        src={item.file.url}
                                                        sx={{
                                                            mr: 2,
                                                            width: 73,
                                                            height: 73,
                                                            borderRadius: 0
                                                        }}
                                                    />
                                                    <Box sx={{ mt: -.5 }}>
                                                        <Typography
                                                            fontSize={16}
                                                            fontWeight="bold"
                                                            color="secondary"
                                                        >
                                                            {item.title}
                                                        </Typography>
                                
                                                        <Box
                                                            sx={{
                                                                mt: .5,
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <Typography
                                                                fontSize={6}
                                                                fontWeight="bold"
                                                                color="primary"
                                                                sx={{
                                                                    padding: .25,
                                                                    backgroundColor: item.type === 'event'
                                                                                        ? '#ee8686'
                                                                                        : item.type === 'publication'
                                                                                            ? '#707070'
                                                                                            : '#3489b1'
                                                                }}
                                                            >
                                                                {
                                                                    item.type === 'event'
                                                                        ? 'EVENTO'
                                                                        : item.type === 'publication'
                                                                            ? 'PUBLICAÇÃO'
                                                                            : 'COMUNICADO'
                                                                }
                                                            </Typography>
                                
                                                            {
                                                                item.type !== 'event'
                                                                    ? null
                                                                    :
                                                                        <>
                                                                            <Typography
                                                                                ml={.5}
                                                                                fontSize={9}
                                                                                fontWeight="light"
                                                                                color="secondary"
                                                                            >
                                                                                {`${item.info.place.toUpperCase()}`}
                                                                            </Typography>
                                
                                                                            <Divider
                                                                                orientation="vertical"
                                                                                variant="middle"
                                                                                flexItem
                                                                                color="#707070"
                                                                                sx={{
                                                                                    height: 11,
                                                                                    margin: '0 4px',
                                                                                    opacity: .75
                                                                                }}
                                                                            />
                                                                        </>
                                
                                                            }
                                
                                                            <Typography
                                                                // ml={.5}
                                                                fontSize={9}
                                                                fontWeight="light"
                                                                color="ternary"
                                                            >
                                                                {`${item.info.date}`}
                                                            </Typography>
                                
                                                            {
                                                                item.type !== 'event'
                                                                    ? null
                                                                    : 
                                                                    <>
                                                                        <Divider
                                                                            orientation="vertical"
                                                                            variant="middle"
                                                                            flexItem
                                                                            color="#707070"
                                                                            sx={{
                                                                                height: 11,
                                                                                margin: '0 4px',
                                                                                opacity: .75
                                                                            }}
                                                                        />
                                                            
                                                                        <Typography
                                                                            fontSize={9}
                                                                            fontWeight="light"
                                                                            color="#3489b1"
                                                                            textTransform="uppercase"
                                                                            sx={{ textDecorationLine: 'underline', cursor: 'pointer' }}
                                                                        >
                                                                            {`${item.length} confirmados de 15`}
                                                                        </Typography>
                                                                    </>
                                                            }
                                                        </Box>
                                
                                                        <Typography
                                                            mt={.5}
                                                            fontSize={13}
                                                            fontWeight="light"
                                                            color="secondary"
                                                        >
                                                            {item.description}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <IconButton
                                                    aria-label="more"
                                                    id="long-button"
                                                    aria-controls={open ? 'long-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    sx={{
                                                        width: 24,
                                                        height: 24,
                                                        borderRadius: 50,
                                                        backgroundColor: '#dbdbdb',
                                                    }}
                                                    onClick={handleClick}
                                                >
                                                    <MoreHoriz sx={{ width: 24, height: 24 }} />
                                                </IconButton>
                                                <Menu
                                                    id="long-menu"
                                                    MenuListProps={{
                                                        'aria-labelledby': 'long-button',
                                                    }}
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    PaperProps={{
                                                        style: {
                                                        maxHeight: ITEM_HEIGHT * 4.5,
                                                        width: '20ch',
                                                        },
                                                    }}
                                                >
                                                    {
                                                        options().map((option) => (
                                                            <MenuItem
                                                                key={option}
                                                                selected={option === 'more'}
                                                                onClick={handleClose}
                                                            >
                                                                {option}
                                                            </MenuItem>
                                                    ))}
                                                </Menu>
                                            </Box>
                                        </Grid>
                                    ))
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