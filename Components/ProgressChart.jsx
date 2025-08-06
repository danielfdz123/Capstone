import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import './ProgressChart.css';


const ProgressChart = ({exerciseList, exerciseName}) => {
    const filteredData = exerciseList
    .filter(ex => ex.name.toLowerCase() === exerciseName.toLowerCase())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(ex => ({
        date: ex.date,
        weight: Number(ex.weight) || 0,
        reps: Number(ex.reps) || 0,
        sets: Number(ex.sets) || 0,
    }));

    if (filteredData.length === 0) {
        return <p className="no-data"> No data for "{exerciseName}" yet. </p>;
    }

    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData} margin={{top: 20, right: 30, left: 20, bottom: 5}}> 
                    <CartesianGrid strokDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="weight" stroke="#007bff" name="Weight (lb)" />
                    <Line type="monotone" dataKey="reps" stroke="#82ca9d" name="Reps" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProgressChart;