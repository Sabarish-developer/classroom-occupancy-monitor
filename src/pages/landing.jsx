import { Header } from "../components/header";
import { Hero } from "../components/hero";
import background from '../assets/background.png';
import { Features } from "../components/features";

export const Landing = () => {
    return(
      <div className='bg-cover bg-fixed bg-center ' style={{ backgroundImage: `url(${background})` }}> 
        <Header />
        <Hero />
        <section id="features" className=''><Features /></section>
        <section id="about" className='h-[500px]'>about</section>
        <section id="contact" className='h-[500px]'>contact</section>
        <section id="faqs" className='h-[500px]'>FAQs</section>
      </div>
    );

}