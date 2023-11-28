
import MemberShipItem from '../../components/items/MemberShipItem';


const MemberShip = () => {

    const pacakges = [
        {
            _id: 1,
            name : 'Primary',
            price: "Free",
            limit: 5,
            access : "1 month" ,// month
            support: "Not support",
        },
        {
            _id: 2,
            name : 'Gold',
            price: "30",
            limit: "Unlimited",
            access : "10 month" ,// month
            support: "Email support",
        },
    ]

   

    return (
        <div>
            <div className="container mt-10">
                <div className='w-full lg:w-[800px] pb-10 mx-auto grid md:grid-cols-2 gap-5'>

                    {
                        pacakges?.map(item => <MemberShipItem key={item?._id} item={item} /> )
                    }
                </div>
            </div>
        </div>
    );
};

export default MemberShip;