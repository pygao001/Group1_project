
import * as artistService from '../services/artistService.js';

export const getArtists = async (req, res) => {
    try {
        const artists = await artistService.getAllArtists();
        res.json(artists);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getArtistById = async (req, res) => {
    try {
        const artist = await artistService.getArtistById(req.params.id);
        if (artist) {
            res.json(artist);
        } else {
            res.status(404).send('Artist not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const createArtist = async (req, res) => {
    try {
        const newArtist = await artistService.createArtist(req.body);
        res.status(201).json(newArtist);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateArtist = async (req, res) => {
    try {
        const updatedArtist = await artistService.updateArtist(req.params.id, req.body);
        if (updatedArtist) {
            res.json(updatedArtist);
        } else {
            res.status(404).send('Artist not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteArtist = async (req, res) => {
    try {
        const deleted = await artistService.deleteArtist(req.params.id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Artist not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

