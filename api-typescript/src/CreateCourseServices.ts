
interface Course{
  name: string; 
  duraction?: number; 
  educator: string
}

class CrateCourseServices{

  execute({name, duraction = 8, educator}: Course){
    console.log(name, duraction, educator)
  }  
}

export default new CrateCourseServices;