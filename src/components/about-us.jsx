import aboutus from '../assets/aboutus.png';

export const Aboutus = () => {

    return (
        <>
        <h2 className="font-bold text-center text-2xl md:text-3xl lg:text-4xl">About us</h2>
        <div className='flex flex-col md:flex-row p-10 justify-center gap-8 max-w-5xl mx-auto items-center'>
            <img src={aboutus} alt='about us icon' className='w-70'></img>
            <div>
                <p className='text-sm md:text-base lg:text-lg text-gray-500 mb-8'>
                    A simple classrooms and event halls occupancy monitoring system built for campuses and corporate
                    offices to enhance resource usage and productivity.
                </p>
                <p className='text-sm md:text-base lg:text-lg text-gray-500'>OccupiX is a college project developed by students to streamline campus workflows and optimize space usage. 
                    Using real-time data, digital twins, and secure access control, it helps students, teachers,
                    and admins manage classrooms, staffrooms, canteens, and events efficiently. 
                    This project demonstrates practical application of technologies like microservices architecture, 
                    Azure Digital Twins, and modern web development.
                </p>
            </div>
        </div>
        </>
    )
}