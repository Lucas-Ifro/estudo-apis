import { Response, Request, response } from 'express';
import CrateCourseServices from './CreateCourseServices';

export function crateCourse(req: Request, res: Response ) {

    CrateCourseServices.execute({
        name: "como lutar contra o sono",
        duraction: 10,
        educator: "lucas"
    })

    CrateCourseServices.execute({
        name: "como lutar contra o sono",
        educator: "lucas"
    })

    return response.send()
}