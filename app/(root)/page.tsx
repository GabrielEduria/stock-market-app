import TradingViewWidget from '@/components/charts/TradingViewWidget'

const Home = () => {
  return (
    <div className='flex min-h-screen home-wrapper'>
       <section className='grid w-full gap-8 home-section'>
          <div className='md:col-span-1 xl:col-span-1'>
              <TradingViewWidget
                 title="Market Overview"
                 scriptUrl=""
              />
          </div>

       </section>
    </div>
  )
}

export default Home