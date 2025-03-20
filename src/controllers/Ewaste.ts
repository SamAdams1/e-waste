import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Ewaste from "../models/Ewaste";

const createEwaste = (req: Request, res: Response, next: NextFunction) => {
    const { type, weight, battery, data_wiped, bin } = req.body;

    const ewaste = new Ewaste({
        _id: new mongoose.Types.ObjectId(),
        type, weight, battery, data_wiped, bin
    });

    return ewaste
        .save()
        .then((ewaste) => res.status(201).json({ ewaste }))
        .catch((error) => res.status(500).json({ error }));
};

const readEwaste = (req: Request, res: Response, next: NextFunction) => {
    const ewasteId = req.params.ewasteId;

    return Ewaste.findById(ewasteId)
        .then((ewaste) => (ewaste ? res.status(200).json({ ewaste }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Ewaste.find()
        .then((ewaste) => res.status(200).json({ ewaste }))
        .catch((error) => res.status(500).json({ error }));
};

const updateEwaste = (req: Request, res: Response, next: NextFunction) => {
    const ewasteId = req.params.ewasteId;

    return Ewaste.findById(ewasteId)
        .then((ewaste) => {
            if (ewaste) {
                ewaste.set(req.body);

                return ewaste
                    .save()
                    .then((ewaste) => res.status(201).json({ ewaste }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteEwaste = (req: Request, res: Response, next: NextFunction) => {
    const ewasteId = req.params.ewasteId;

    return Ewaste.findByIdAndDelete(ewasteId)
        .then((ewaste) => (ewaste ? res.status(201).json({ ewaste, message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createEwaste, readEwaste, readAll, updateEwaste, deleteEwaste };