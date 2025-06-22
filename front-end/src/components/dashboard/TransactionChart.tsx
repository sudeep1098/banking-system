import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', transactions: 4000, volume: 240000 },
    { name: 'Feb', transactions: 3000, volume: 180000 },
    { name: 'Mar', transactions: 5000, volume: 320000 },
    { name: 'Apr', transactions: 4500, volume: 290000 },
    { name: 'May', transactions: 6000, volume: 380000 },
    { name: 'Jun', transactions: 5500, volume: 350000 },
];

export const TransactionChart: React.FC = () => {
    return (
        <Card className="h-full">
            <CardContent>
                <Typography variant="h6" className="font-semibold text-gray-900 mb-4">
                    Transaction Overview
                </Typography>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="transactions"
                                stroke="#2e7d32"
                                strokeWidth={3}
                                name="Transactions"
                                dot={{ fill: '#2e7d32', strokeWidth: 2, r: 4 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="volume"
                                stroke="#1976d2"
                                strokeWidth={3}
                                name="Volume ($)"
                                dot={{ fill: '#1976d2', strokeWidth: 2, r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};