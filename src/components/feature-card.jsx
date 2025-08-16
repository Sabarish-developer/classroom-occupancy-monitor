
export const FeatureCard = ({logo, title, content}) => {
    return (
        <div className='flex flex-col gap-2 min-w-[300px] max-w-[400px] p-2 border-2 border-[#0a7a1e] rounded-2xl h-full'>
            <img src={logo} alt='icon' className='w-10 mx-auto '/>
            <h3 className='font-bold text-xl text-center'>{title}</h3>
            <p className='text-center text-gray-500 flex-grow'>{content}</p>
        </div>
    )
}