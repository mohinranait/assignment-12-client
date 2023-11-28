import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import ReportCommentRows from "../../components/tableRows/ReportCommentRows";


const ReportedActivates = () => {
    const axios = useAxios();
    const {data:reportedComments=[], refetch:adminCommentRefetch} = useQuery({
        queryKey: ['reportedComments'],
        queryFn : async ()=>{
            const {data} = await axios.get("/reported-comments");
            return data;
        }
    })


    return (
        <>
            <div>
                <div className="mt-5">
                    <div className="overflow-x-auto md:w-[70vw] mx-auto">
                    <p className="text-xl font-medium text-gray-600 mb-3">Comment Reportes</p>
                        <table className="table-auto w-full border-collapse border">
                            <thead>
                                <tr className="bg-gray-200 py-2">
                                    <th className="text-left py-2 pl-2 text-gray-600 text-sm">SI</th>
                                    <th className="text-left py-2 pl-2 text-gray-600 text-sm">Comment text</th>
                                    <th className="text-left py-2 pl-2 text-gray-600 text-sm">Feedback</th>
                                    <th className="text-left py-2 pl-2 text-gray-600 text-sm">Commenter</th>
                                    <th className="text-left py-2 pl-2 text-gray-600 text-sm">Reporter</th>
                                    <th className="text-left py-2 pl-2 text-gray-600 text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reportedComments?.map((comment,index) => <ReportCommentRows key={comment?._id} adminCommentRefetch={adminCommentRefetch} index={index} comment={comment} /> )
                                }
                                <tr></tr>                          
                            </tbody>
                        </table>
                    
                    </div>
                </div>
            </div>   
        </>
    );
};

export default ReportedActivates;