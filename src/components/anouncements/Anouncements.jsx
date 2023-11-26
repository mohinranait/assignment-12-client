import useAnnouncement from '../../hooks/useAnnouncement';

const Anouncements = () => {

    const [announcements] = useAnnouncement();


    return (
        <>
            {
                announcements?.length > 0 && 
            
                <div className="bg-white py-5 px-4 shadow-sm border border-gray-100">
                    <p className="text-xl font-medium text-gray-500 mb-4">Announcement</p>
                    <ul className="space-y-2">
                        {
                            announcements?.map(item => <li key={item?._id} className="bg-gray-50  rounded-3xl overflow-hidden px-3 py-2">
                                <div className="flex gap-2 items-center">
                                    <img src={item?.authorImage} className="w-8 rounded-full" alt="" />
                                    <div>
                                        <p className="text-gray-500 text-sm">{item?.title}</p>
                                        <p className="text-gray-500 text-xs">{item?.description}</p>
                                    </div>
                                </div>
                            </li> )
                        }
                    </ul>
                </div>   
            }
        </>
    );
};

export default Anouncements;