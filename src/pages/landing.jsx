import classroom from '../assets/classroom.jpg';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const Landing = () => {
    return(
        <div className=''>
            <div className='flex flex-col gap-4'>
                <h2 className='mt-10 font-bold text-center sm:mt-16 text-1xl sm:text-2xl lg:text-4xl'>
                    Realtime Classroom Occupancy — Entire Campus at a Glance
                </h2>
                <h4 className='font-bold text-center text-sm sm:text-md lg:text-lg italic'>
                    "Monitor every classroom across all blocks with live occupancy counts, powered by digital twins."
                </h4>
            </div>
            <div className='flex justify-around sm:flex-row flex-col gap-8 mt-10 sm:mx-50 mx-8'>
                <div>
                    <img src={classroom} alt='classroom' className='rounded-lg'></img>
                </div>
                <div>
                    <div className="flex justify-center items-center w-full">
                    <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                    {[
                "1. Campus-wide monitoring",
        "2. Live occupancy updates",
        "3. Block & room insights",
        "4. Search & filter tools",
        "5. Daily usage summaries"
      ].map((feature, index) => (
        <CarouselItem key={index}>
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-3xl font-semibold text-center text-[#22c55e] italic">{feature}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</div>
                </div>
            </div>

            <Accordion type="multiple" collapsible className="px-2 md:px-11 w-full mt-10">
  <AccordionItem value="item-1">
    <AccordionTrigger>
      How does the classroom occupancy system work?
    </AccordionTrigger>
    <AccordionContent>
      The system maps all blocks and classrooms in a digital twin model.
      Live occupancy counts are fetched (currently via simulation scripts,
      future-ready for IoT sensors) and displayed instantly on the dashboard.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>
      What data is shown for each classroom?
    </AccordionTrigger>
    <AccordionContent>
      For each classroom, the dashboard shows capacity, current occupancy
      count, and a color-coded status (green = low, yellow = moderate,
      red = near full).
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger>
      What are the main benefits of using this system?
    </AccordionTrigger>
    <AccordionContent>
      The system improves space utilization, reduces energy wastage,
      prevents overcrowding, and gives administrators real-time insights
      into campus usage patterns.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-4">
    <AccordionTrigger>
      Will the system work without IoT sensors?
    </AccordionTrigger>
    <AccordionContent>
      Yes. For demonstration purposes, occupancy data can be generated
      using scripts. However, real-world deployment would use IoT
      sensors for accurate, automated counts.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-5">
    <AccordionTrigger>
      What’s planned for the future?
    </AccordionTrigger>
    <AccordionContent>
      Future versions will feature AI-based occupancy prediction,
      historical usage analytics, energy optimization recommendations,
      and campus-wide scheduling integration.
    </AccordionContent>
  </AccordionItem>
</Accordion>
        </div>
        
    );

}