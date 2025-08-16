import { Header } from "../components/header";
import { Hero } from "../components/hero";
import background from '../assets/background.png';
import { Features } from "../components/features";
import { Aboutus } from "../components/about-us";
import { Contactus } from "../components/contact-us";

export const Landing = () => {
    return(
      <div className='bg-cover bg-fixed bg-center ' style={{ backgroundImage: `url(${background})` }}> 
        <Header />
        <Hero />
        <section id="features" className='my-10'>
          <Features />
        </section>
        <section id="about" className='my-10'>
          <Aboutus />
        </section>
        <section id="contact" className='my-10'>
          <Contactus />
        </section>
        <section id="faqs" className='h-[500px]'>FAQs</section>
      </div>
    );

}