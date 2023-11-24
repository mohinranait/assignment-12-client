

const HomeBanner = () => {
    return (
        <>
            <div className="bg-cover bg-center relative" style={{backgroundImage:`url('https://aardvark.ghostpool.com/original/wp-content/uploads/sites/6/2017/11/membership-circles.png')`}}>
                <div className="bg-black bg-opacity-50 absolute w-full h-full left-0 top-0"></div>
                <div className="container z-50 relative">
                    <div className='h-[60vh] flex items-center justify-center'>
                        <div className="lg:w-[50vw] flex flex-col gap-12">
                            <div>
                                <h1 className="text-center text-6xl font-bold text-white">Onlien  convercation  <br /> group people</h1>
                            </div>
                            <div className="flex flex-col gap-2"> 
                                <div className="flex rounded">
                                    <input type="text" className="w-full py-3 px-3 rounded-l" placeholder="Search" />
                                    <button className="bg-purple-500 text-white px-5 text-sm font-semibold rounded-r">Search</button>
                                </div>
                                <div className="flex gap-1">
                                    <span className="px-3 inline-block rounded-xl bg-purple-500 text-xs font-medium py-1  text-white">asdf</span>
                                    <span className="px-3 inline-block rounded-xl bg-purple-500 text-xs font-medium py-1  text-white">asdf</span>
                                    <span className="px-3 inline-block rounded-xl bg-purple-500 text-xs font-medium py-1  text-white">asdf</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>   
        </>
    );
};

export default HomeBanner;