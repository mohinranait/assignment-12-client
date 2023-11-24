import React from 'react';
import { FaHandPointDown, FaHandPointUp, FaShare, FaShareAlt } from 'react-icons/fa';

const Post = () => {
    return (
        <div className='py-5 border-b'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-1 items-center'>
                    <div>
                        <img className='w-12 h-12 rounded-full' src="https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg" alt="" />
                    </div>
                    <div>
                        <p className='text-sm font-medium'>Mohin Rana</p>
                        <p className='text-xs '>12/14/2023</p>
                    </div>
                </div>
                <div>
                    <button><FaShareAlt /></button>
                </div>
            </div>
            <div className='my-3'>
                <img className='rounded-md' src="https://media.istockphoto.com/id/1014903134/vector/flat-style-vector-illustration-discuss-social-network-news-chat-dialogue-speech-bubbles.jpg?s=612x612&w=0&k=20&c=14cpsgrmH1ruo2_tVJPlRIBBB7VNnpNYz8tuTl3ZHkg=" alt="" />
            </div>
            <div className='flex justify-between items-center mb-2 mt-2'>
                <ul className='flex items-center gap-1'>
                    <li><a href="#" className='px-2 text-sm py-1 rounded bg-gray-100 hover:bg-gray-200 flex items-center gap-1'>Vote Down<FaHandPointDown /></a></li>
                    <li><a href="#" className='px-2 text-sm py-1 rounded bg-gray-100 hover:bg-gray-200 flex items-center gap-1'>Vote Up<FaHandPointUp /></a></li>
                </ul>
                <a href="#" className='text-sm px-2 py-1 rounded bg-gray-100 hover:bg-gray-200'>Comment</a>
            </div>
            <div className=' items-center  mt-2 '>
                <p className='text-xs font-medium text-purple-400 '>#apple</p>
                <p className='text-sm font-medium my-1'>Lorem ipsum dolor sit amet.</p>
                
                <p className='text-xs font-medium'>Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
    );
};

export default Post;