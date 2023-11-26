/* eslint-disable react/prop-types */
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const PichartsJs = ({analitics}) => {
    const data = [
        { name: 'Posts', value: analitics?.posts },
        { name: 'Comments', value: analitics?.comments },
        { name: 'Users', value: analitics?.users },
    ];
    return (
        <>
            <div className='bg-white border pb-8 border-gray-100 shadow-sm'>
             
                    <PieChart width={400} height={300}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
            </div>   
        </>
    );
};

export default PichartsJs;