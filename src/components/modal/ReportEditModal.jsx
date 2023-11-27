/* eslint-disable react/prop-types */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import useAxios from '../../hooks/useAxios';
import toast from 'react-hot-toast';

const ReportEditModal = ({isOpen, closeModal,commentText,_id,adminCommentRefetch}) => {
    const axios = useAxios();
    
    const handleUdpateCommentForAdmin = async e => {
        e.preventDefault();

        const update = {
            comment : e.target.comment.value,
            visibility : e.target.visibility.value,
        }

        try {
            const res = await axios.patch(`/update-comments/${_id}` , update);
            if(res.data.success){
                toast.success("Updated");
                e.target.reset();
                closeModal()
                adminCommentRefetch()
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <form onSubmit={handleUdpateCommentForAdmin} className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Edit reporte comments
                            </Dialog.Title>
                            <div className="mt-2">
                                <div>
                                    <textarea name="comment" defaultValue={commentText} id="" cols="30" rows="2" className='w-full mb-3 rounded p-3 outline-none text-sm border border-gray-300'></textarea>
                                    <select name="visibility" className='py-2 text-gray-500 px-3 rounded outline-none border border-gray-200 w-full' id="">
                                        <option value="">Visibility</option>
                                        <option value="true">Public</option>
                                        <option value="false">Un Public</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={closeModal}
                                >
                                Close
                                </button>
                                <button type='submit' className='pinline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'>Update</button>
                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        </form>
                    </div>
                </Dialog>
            </Transition>   
        </>
    );
};

export default ReportEditModal;