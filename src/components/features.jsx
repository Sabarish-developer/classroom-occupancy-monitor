import { FeatureCard } from "./feature-card"
import student from '../assets/student.png';
import teacher from '../assets/teacher.png';
import admin from '../assets/admin.png';
import digitaltwin from '../assets/digitaltwin.png';
import security from '../assets/security.png';
import event from '../assets/event.png';

export const Features = () => {

    const features = [
        {
            logo: student,
            title: 'Live classroom status',
            content: 'Students can check real-time occupancy and find free classrooms instantly'
        },
        {
            logo: teacher,
            title: 'Staffroom & Canteen Management',
            content: 'View staffroom and canteen availability to use efficiently'
        },
        {
            logo: admin,
            title: 'Analytics & Reports',
            content: 'Monitor trends, generate reports, and optimize campus space usage'
        },
        {
            logo: digitaltwin,
            title: 'Smart Campus Simulation',
            content: 'Use digital twins to model and predict classroom occupancy in real time'
        },
        {
            logo: security,
            title: 'Security',
            content: 'Protect campus data and control access to rooms and sensitive systems'
        },
        {
            logo: event,
            title: 'Efficient event management',
            content: 'Easily manage hall schedules and book rooms for events or classes'
        }
        
    ]


    return (
        <div>
            <h2 className="font-bold text-center text-2xl md:text-3xl lg:text-4xl">Why Choose OccupiX?</h2>
            <div className="p-10 flex flex-col items-center gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 justify-items-center auto-rows-fr">
            {
                features.map((feature, index) => {
                    return <FeatureCard key={index} logo={feature.logo} title={feature.title} content={feature.content} />
                })
            }
            </div>
        </div>
        
    )
}