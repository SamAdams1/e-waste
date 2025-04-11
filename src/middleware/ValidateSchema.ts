import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IEwaste } from '../models/Ewaste';
import { IBins } from '../models/Bins';
import Logging from '../library/Logging';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    ewaste: {
        create: Joi.object<IEwaste>({
            type: Joi.string().required(),
            weight: Joi.number().required(),
            battery: Joi.boolean().required(),
            data_wiped: Joi.boolean().required(),
            bin: Joi.number().required()
        }),
        update: Joi.object({
            type: Joi.string().required(),
            weight: Joi.number().required(),
            battery: Joi.boolean().required(),
            data_wiped: Joi.boolean().required(),
            bin: Joi.number().required()
        })
    },
    bins: {
        create: Joi.object<IBins>({
            weight: Joi.number().required(),
            fullness: Joi.number().required(),
            location: Joi.any().required(),
            online: Joi.boolean().required()
        }),
        update: Joi.object({
            weight: Joi.number().required(),
            fullness: Joi.number().required(),
            location: Joi.any().required(),
            online: Joi.boolean().required()
        })
    }
};