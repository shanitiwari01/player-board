import React, { useEffect, useState } from 'react';
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import moment from 'moment/moment';

/**
 * Players component displays a list of players based on the search input.
 * @param {string} search - The search input to filter the players.
 */
export default function Players({ search }) {
    const [masterPlayers, setMasterPlayers] = useState([]);
    const [players, setPlayers] = useState([]);

    // Fetches the players data when the component mounts.
    useEffect(() => {
        fetchPlayers();
    }, [])

    /**
     * Updates the players list based on the search input or resets it to the master players list.
     */
    useEffect(() => {
        if (search) {
            let searchStr = search.toLowerCase()
            let players = masterPlayers.filter((player) => player.TName.toLowerCase().includes(searchStr) || player.PFName.toLowerCase().includes(searchStr))
            setPlayers(players);
        } else {
            setPlayers(masterPlayers);
        }
    }, [search, masterPlayers])

    /**
     * Fetches the players data from the API and updates the players list.
     */
    const fetchPlayers = async () => {
        let response = await fetch(process.env.REACT_APP_API);
        let playersDetails = await response.json();

        if (playersDetails?.playerList.length > 0) {
            let playerList = playersDetails.playerList;
            playerList.sort((a, b) => a.Value - b.Value);
            setPlayers(playerList);
            setMasterPlayers(playerList);
        }
    }

    /**
     * Renders the player card with player details and upcoming matches.
     * @param {object} player - The player object containing player details.
     * @returns {JSX.Element} - The player card component.
     */
    const playerCard = (player) => {
        return (
            <Grid item xs={12} s={12} md={6} lg={3}>
                <Card className='player-card' >
                    <CardMedia
                        image={`/player-images/${player.Id}.jpg`}
                        title={player.PFName}
                        className='player-image'
                        component="img"
                        onError={event => {
                            event.target.src = "/player-images/avatar.png"
                            event.onerror = null
                        }}

                    />
                    <CardContent>
                        <Typography className='player-name-container' title={player.PFName} gutterBottom variant="h5" component="div">
                            <span className='player-name'>
                                <span>{player.PFName}</span>
                                <span>{player.SkillDesc}</span>
                            </span>
                        </Typography>
                        {(player.UpComingMatchesList && player.UpComingMatchesList.length > 0) && player.UpComingMatchesList.map((match) => matches(match))}
                    </CardContent>
                    <CardActions >
                        <Button variant="outlined" className='buy-button'  >${player.Value} </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }

    /**
     * Renders the upcoming match details.
     * @param {object} match - The match object containing match details.
     * @returns {JSX.Element} - The match container component.
     */
    const matches = (match) => {
        let matchDate = new Date(match.MDate);
        let contentHidden = true;
        if (matchDate && match.CCode && match.VsCCode) {
            contentHidden = false;
        }

        return (
            <div className={`match-container ${contentHidden && "visibility-hidden"}`} >
                <span className='player-name'>
                    <span>{"Match"}</span>
                    <span>{match.CCode} VS. {match.VsCCode}</span>
                </span>
                <span className='player-name'>
                    <span>{"Time"}</span>
                    <span>{moment(matchDate).format('DD-MM-YYYY h:mm:ss a')}</span>
                </span>
            </div>
        )
    }

    return (
        <div className='players-container'>
            <Grid container spacing={2} >
                {players.map((player) => playerCard(player))}
            </Grid>
        </div>
    );
}