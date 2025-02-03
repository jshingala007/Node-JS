const express = require('express');
const MovieModule = require('../model/MovieModel');
const fs = require('fs');
const path = require('path');

const ViewMovie = async (req, res) => {
    try {
        const movies = await MovieModule.find();
        return res.render('viewMovie', { movies });
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while fetching movies.');
    }
};

const AddMovie = (req, res) => {
    return res.render('addMovie');
};

const insertMovie = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const movie = await MovieModule.create({
            name,
            description,
            price,
            image: req.file?.path // Optional chaining in case req.file is undefined
        });
        console.log("Added..");
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while adding the movie.');
    }
};

const deleteMovie = async (req, res) => {
    try {
        const deid = req.query.deletId;
        const single = await MovieModule.findById(deid);

        if (single) {
            if (fs.existsSync(single.image)) {
                fs.unlinkSync(single.image);
            }
            await MovieModule.findByIdAndDelete(deid);
            console.log("Deleted..");
            return res.redirect('/');
        } else {
            return res.status(404).send('Movie not found.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while deleting the movie.');
    }
};

const editMovie = async (req, res) => {
    try {
        const eid = req.query.editId;
        const single = await MovieModule.findById(eid);
        if (single) {
            return res.render('editMovie', { single });
        } else {
            return res.status(404).send('Movie not found.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while fetching the movie for editing.');
    }
};

const UpdateMovie = async (req, res) => {
    try {
        const { name, description, price, editid } = req.body;

        const updateData = { name, description, price };
        const single = await MovieModule.findById(editid);

        if (single) {
            if (req.file) {
                if (fs.existsSync(single.image)) {
                    fs.unlinkSync(single.image);
                }
                updateData.image = req.file.path;
            } else {
                updateData.image = single.image; // Keep the existing image if no new file is uploaded
            }

            await MovieModule.findByIdAndUpdate(editid, updateData);
            console.log("Updated..");
            return res.redirect('/');
        } else {
            return res.status(404).send('Movie not found.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while updating the movie.');
    }
};

module.exports = {
    ViewMovie,
    AddMovie,
    insertMovie,
    deleteMovie,
    editMovie,
    UpdateMovie
};
