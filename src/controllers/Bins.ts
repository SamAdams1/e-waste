import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Bins from "../models/Bins";

const createBins = (req: Request, res: Response, next: NextFunction) => {
    const { weight, fullness, location, online } = req.body;

    const bins = new Bins({
        _bin_id: new mongoose.Types.ObjectId(),
        weight, fullness, location, online
    });

    return bins
        .save()
        .then((bins) => res.status(201).json({ bins }))
        .catch((error) => res.status(500).json({ error }));
};

const readBins = (req: Request, res: Response, next: NextFunction) => {
    const binId = req.params.binId;

    return Bins.findById(binId)
        .then((ewaste) => (ewaste ? res.status(200).json({ ewaste }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Bins.find()
        .then((bins) => res.status(200).json({ bins }))
        .catch((error) => res.status(500).json({ error }));
};

const updateBins = (req: Request, res: Response, next: NextFunction) => {
    const binId = req.params.binId;

    return Bins.findById(binId)
        .then((bins) => {
            if (bins) {
                bins.set(req.body);

                return bins
                    .save()
                    .then((bins) => res.status(201).json({ bins }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteBins = (req: Request, res: Response, next: NextFunction) => {
    const binId = req.params.ewasteId;

    return Bins.findByIdAndDelete(binId)
        .then((bins) => (bins ? res.status(201).json({ bins, message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createBins, readBins, readAll, updateBins, deleteBins };