import { useState } from 'react';
import {
    Avatar,
    Box,
    Divider,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from '@mui/material'
import { MoreHoriz } from '@mui/icons-material';
import ModalLink from './ModalLink';

const ITEM_HEIGHT = 48;

const options = ['Excluir item']

export default function HomeCards({ item, data }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);
    
    return (
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
                                    : <ModalLink key={item.id} item={item.invited_people} />

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
                        options.map((option) => (
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
    );
}