import { Response, Request, response } from 'express';
import CrateCourseServices from './CreateCourseServices';

export function crateCourse(req: Request, res: Response ) {

    CrateCourseServices.execute("como lutar contra o sono", 10, "lucas")

    return response.send()
}