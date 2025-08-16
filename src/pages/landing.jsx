import { Header } from "../components/header";
import { Card, CardContent } from "@/components/ui/card"
import background from '../assets/background.png';
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
      <div className='bg-cover bg-fixed bg-center ' style={{ backgroundImage: `url(${background})` }}> 
        <Header />
        <section id="features" className='h-[500px]'>features</section>
        <section id="about" className='h-[500px]'>about</section>
        <section id="contact" className='h-[500px]'>contact</section>
        <section id="faqs" className='h-[500px]'>faqs</section>
      </div>
    );

}